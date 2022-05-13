import base64
import cv2 as cv
from matplotlib.colors import rgb2hex
import numpy as np
import io
from matplotlib import pyplot as plt
from flask import Flask, request
from flask_cors import CORS
from imageio import imread

# GATEWAY
app = Flask(__name__)
CORS(app)

@app.route('/negative', methods=['POST'])
def postNegativeRequest():
    base64Img = request.get_json()['base64Img']

    img = imread(io.BytesIO(base64.b64decode(base64Img)))
    img = cv.cvtColor(img, cv.COLOR_BGR2RGB)
    img_neg = 1 - img
    cv.imwrite('output.png', img_neg)
    with open('output.png', "rb") as fid:
        data = fid.read()
    b64_bytes = base64.b64encode(data)
    b64_string = b64_bytes.decode()

    return b64_string

@app.route('/log-transformation', methods=['POST'])
def postLogTransformationRequest():
    base64Img = request.get_json()['base64Img']
    c = request.get_json()['c']

    img = imread(io.BytesIO(base64.b64decode(base64Img)))
    img = cv.cvtColor(img, cv.COLOR_BGR2RGB)
    log_image = c * (np.log(img + 1))
    log_image = np.array(log_image, dtype = np.uint8)
    cv.imwrite('output.png', log_image)
    with open('output.png', "rb") as fid:
        data = fid.read()
    b64_bytes = base64.b64encode(data)
    b64_string = b64_bytes.decode()

    return b64_string

@app.route('/smoothing/gaussian', methods=['POST'])
def postSmoothingRequest():
    kernel = request.get_json()['kernel'] # get kernel 
    base64Img = request.get_json()['base64Img']
    threshold = request.get_json()['threshold']

    img = imread(io.BytesIO(base64.b64decode(base64Img)))
    img = cv.cvtColor(img, cv.COLOR_BGR2RGB)
    blur = cv.GaussianBlur(img,(kernel, kernel), threshold)
    cv.imwrite('output.png', blur)
    with open('output.png', "rb") as fid:
        data = fid.read()
    b64_bytes = base64.b64encode(data)
    b64_string = b64_bytes.decode()

    return b64_string

@app.route('/smoothing/median', methods=['POST'])
def postMedianRequest():
    kernel = request.get_json()['kernel'] # get kernel 
    base64Img = request.get_json()['base64Img']

    img = imread(io.BytesIO(base64.b64decode(base64Img)))
    img = cv.cvtColor(img, cv.COLOR_BGR2RGB)
    blur = cv.medianBlur(img, kernel)
    cv.imwrite('output.png', blur)
    with open('output.png', "rb") as fid:
        data = fid.read()
    b64_bytes = base64.b64encode(data)
    b64_string = b64_bytes.decode()

    return b64_string

@app.route('/sharpening/gaussian', methods=['POST'])
def postSharpeningGaussianRequest():
    kernel = request.get_json()['kernel'] # get kernel 
    base64Img = request.get_json()['base64Img']
    threshold = request.get_json()['threshold']

    img = imread(io.BytesIO(base64.b64decode(base64Img)))
    img = cv.cvtColor(img, cv.COLOR_BGR2RGB)
    blur = blur = cv.GaussianBlur(img, (kernel, kernel), threshold)
    sharpened = float(2) * img - float(1) * blur
    sharpened = np.maximum(sharpened, np.zeros(sharpened.shape))
    sharpened = np.minimum(sharpened, 255 * np.ones(sharpened.shape))
    sharpened = sharpened.round().astype(np.uint8)
    if threshold > 0:
        low_contrast_mask = np.absolute(img - blur) < threshold
        np.copyto(sharpened, img, where=low_contrast_mask)

    cv.imwrite('output.png', sharpened)
    with open('output.png', "rb") as fid:
        data = fid.read()
    b64_bytes = base64.b64encode(data)
    b64_string = b64_bytes.decode()

    return b64_string


@app.route('/sharpening/median', methods=['POST'])
def postSharpeningMedianRequest():
    kernel = request.get_json()['kernel'] # get kernel 
    base64Img = request.get_json()['base64Img']

    img = imread(io.BytesIO(base64.b64decode(base64Img)))
    img = cv.cvtColor(img, cv.COLOR_BGR2RGB)
    blur = cv.medianBlur(img, kernel)
    sharpened = float(2) * img - float(1) * blur
    sharpened = np.maximum(sharpened, np.zeros(sharpened.shape))
    sharpened = np.minimum(sharpened, 255 * np.ones(sharpened.shape))
    sharpened = sharpened.round().astype(np.uint8)

    cv.imwrite('output.png', sharpened)
    with open('output.png', "rb") as fid:
        data = fid.read()
    b64_bytes = base64.b64encode(data)
    b64_string = b64_bytes.decode()

    return b64_string

if __name__ == '__main__':
    app.run()