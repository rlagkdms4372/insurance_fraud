import pickle
import numpy as np
import xgboost
import joblib

model = joblib.load('xgboost_model.pkl')

arr = np.array([[1000, 3, 1, 2, 71610, 13020, 52080, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1]])

pred = model.predict_proba(arr)[:, 1]
print(pred)

'''
0.67244405
'''
