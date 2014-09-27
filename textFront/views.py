from textFront import app
from flask import render_template, jsonify, request
from os import path
from page_controller import resources, tasks, top_nav
import textFront.texter.wrappers

# serves the landing page
#
@app.route('/')
@app.route('/index')
def index(page_key='Home'):
    template = '%s.html' % page_key
    available_texts = [dict(label=r.split('.')[0], link=r) for r in (resources[page_key])]
    ts=[dict(name=x) for x in tasks]
    return render_template(template, menus=top_nav, texts=available_texts, tasks=ts)

# ajax call, returns a text
#
@app.route('/get_text')
def get_text():
    text_id = request.args.getlist('text_id')[0]
    text_loc = path.join('.', 'textFront','library', text_id)
    with open(text_loc, 'r') as f:
        text = f.read()
    text = text.replace('\r\n','<br />')
    return jsonify({"textbody":text})


#
#
@app.route('/Frequencies')
@app.route('/frequencies')
def frequencies():
   return 'got freqy'

# ajax function to return the top X words
#
@app.route('/get_frequencies')
def get_frequencies():
    request.args.get('text_id')[0]
    get_word_counts() 





