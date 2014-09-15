from textFront import app
from flask import render_template
from page_controller import main_layout

@app.route('/')
@app.route('/index')
def index(menus=main_layout.keys()):
	return render_template("welcome.html", menus=menus)


@app.route('/get_text/<int:text_id>')
def get_text(text_id):
    text = '\n%s\n' % text_id
    return 'texted: %s' % text


