from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['pdf']
    file.save(file.filename)
    return 'File uploaded successfully'

if __name__ == '__main__':
    app.run(debug=True)
