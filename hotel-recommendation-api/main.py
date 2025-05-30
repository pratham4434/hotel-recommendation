from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional,Union
from model.recommender import recommend  # import from your recommender module
import pandas as pd

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or restrict to ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request schema
class RecommendRequest(BaseModel):
    roomtype: str
    country: str
    city: str
    property: str
    starrating: int
    user_id: Optional[Union[str,int]] = None

# Define POST endpoint
@app.post("/recommend")
def get_recommendations(req: RecommendRequest):
    recommendations = recommend(
        type=req.roomtype,
        country=req.country,
        city=req.city,
        property=req.property,
        starrating=req.starrating,
        user_id=req.user_id
    )
    return {"recommendations": recommendations}


# Load hotel data from pickle once
hotel_df = pd.read_pickle("./model/hoteldata.pkl")

@app.get("/hotels")
def get_all_hotels():
    # Select important fields (adjust if needed)
    columns = ["hotelname", "roomtype", "city", "country", "propertytype", "starrating"]
    hotels = hotel_df[columns].dropna(subset=["hotelname"]).to_dict(orient="records")
    return {"hotels": hotels}