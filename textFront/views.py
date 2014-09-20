from textFront import app
from flask import render_template, jsonify, request
from page_controller import main_layout, tasks
from os import path

@app.route('/')
@app.route('/index')
def index(page_key='welcome'):
    template = '%s.html' % page_key
    links = [dict(label=r.split('.')[0], link=r) for r in (main_layout[page_key])]
    menus=sorted(main_layout.keys())
    ts=[dict(name=x) for x in  sorted(tasks)][0]
    return render_template(template, menus=menus, texts=links, tasks=ts)


@app.route('/get_text')
def get_text():

    text_id = request.args.getlist('text_id')[0]
    text_loc = path.join('.', 'textFront','library', text_id)
    with open(text_loc, 'r') as f:
        text = f.read()
    return jsonify({"textbody":text})



