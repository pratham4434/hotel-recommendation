import pickle
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

# Load saved pickles
with open('model/hoteldata.pkl', 'rb') as f:
    df = pickle.load(f)

with open('model/user_history.pkl', 'rb') as f:
    user_history_df = pickle.load(f)

with open('model/tfidf.pkl', 'rb') as f:
    tfidf = pickle.load(f)

def get_user_history(user_id):
    return user_history_df[user_history_df['user_id'] == user_id]

def recommend(type, country, city, property, starrating, user_id=None):
    if user_id:
        user_history = get_user_history(user_id)
        if not user_history.empty:
            user_tags = ' '.join(user_history['tags'].tolist())
        else:
            user_tags = f"{type} {country} {city} {property} {starrating}"
    else:
        user_tags = f"{type} {country} {city} {property} {starrating}"

    temp = df[(df['country'] == country) & (df['city'] == city) & (df['starrating'] >= starrating)]

    user_tags_df = pd.DataFrame({'tags': [user_tags]})
    temp = pd.concat([temp, user_tags_df], ignore_index=True)

    vector = tfidf.transform(temp['tags']).toarray()
    similarity = cosine_similarity(vector)

    last_index = len(temp) - 1
    similar_hotels = sorted(list(enumerate(similarity[last_index])), key=lambda x: x[1], reverse=True)[1:6]

    recommendations = []
    for idx, score in similar_hotels:
        hotel = temp.loc[idx]
        recommendations.append({
            'hotelname': hotel['hotelname'],
            'roomtype': hotel['roomtype'],
            'starrating': hotel['starrating']
        })

    return recommendations
