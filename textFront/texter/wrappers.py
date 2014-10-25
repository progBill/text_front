# -*- coding: utf-8 -*-
from nltk.tokenize import word_tokenize
from nltk.probability import FreqDist
from itertools import *

def get_tokens(s):
    '''Returns a list of word tokens'''
    return word_tokenize(s.encode('utf-8'))

def lexical_diversity(s):
    '''Provides a measure of lexical diversity'''
    num_tokens = len(get_tokens(s))
    num_unique_tokens = len(set(get_tokens(s)))
    # * 1.0 below to make sure we're playing with floats
    return num_tokens * 1.0 / num_tokens

def get_freq_dist_dict(s):
    '''Returns a dict with words as keys and appearance count as value'''
    d={}
    d.update([(x,y) for x,y in FreqDist(get_tokens(s)).iteritems()])
    return d


def get_longest_words(s, x=10):
    '''Returns a list of the X longest  words'''
    tokens = get_tokens(s)
    long_words= sorted(tokens, key=lambda l: len(l))
    return long_words[x*-1:]


def get_chunked_word_frequency(s,w, chunk_size=300):
    '''takes a text and a word, returns a list of frequencies'''
    token_list = get_tokens(s)
    num_tokens = len(token_list)
    freqs = [token_list[i:i+chunk_size].count(w) for i in range(0, len(token_list), chunk_size)]

    return freqs

#########################
##  Just a way to test ##    
#########################
import unittest

class TestNLTKFunctions(unittest.TestCase):
    def test_get_tokens(self):
        self.assertTrue(len(get_tokens('This is my string')) == 4)

    def test_get_token_order(self):
        w = get_tokens('This is my string')
        self.assertTrue(w[0] =='This' and w[1] == 'is' and w[2]=='my' and w[3]=='string')

    def test_lexical_diversity(self):
        test = 'My string is a diverse string.'
        self.assertTrue(lexical_diversity(test) > 0)

    def test_freq_dist_dict(self):
        fd = get_freq_dist_dict('This is a string to get Freqy with.')
        self.assertTrue('Freqy' in fd)

if __name__ == '__main__':
#    suite = unittest.TestLoader().loadTestsFromTestCase(TestNLTKFunctions)
#    unittest.TextTestRunner(verbosity=2).run(suite)
    s="not let belief take hold of him Touching this dreaded sight, twice seen of us: Therefore I have entreated him along With us to watch the minutes of this night; That if again this apparition come, He may approve our eyes and speak to it. HORATIO Tush, tush, 'twill not appear. BERNARDO Sit down awhile; And let us once again assail your ears, That are so fortified against our story What we have two nights seen. HORATIO Well, sit we down, And let us hear Bernardo speak of this. BERNARDO Last night of all, When yond same star that's westward from the pole Had made his course to illume that part of heaven Where now it burns, Marcellus and myself, The bell then beating one,-- Enter Ghost MARCELLUS Peace, break thee off; look, where it comes again! BERNARDO In the same figure, like the king that's dead. MARCELLUS Thou art a scholar; speak to it, Horatio. BERNARDO Looks it not like the king? mark it, Horatio. HORATIO Most like: it harrows me with fear and wonder. BERNARDO It would be spoke to. MARCELLUS Question it, Horatio. HORATIO What art thou that usurp'st this time of night, Together with that fair and warlike form In which the majesty of buried Denmark Did sometimes march? by heaven I charge thee, speak! MARCELLUS It is offended. BERNARDO See, it stalks away! HORATIO Stay! speak, speak! I charge thee, speak! Exit Ghost MARCELLUS 'Tis gone, and will not answer. BERNARDO How now, Horatio! you tremble and look pale: Is not this something more than fantasy? What think you on't? HORATIO Before my God, I might not this believe Without the sensible and true avouch Of mine own eyes. MARCELLUS Is it not like the king? HORATIO As thou art to thyself: Such was the very armour he had on When he the ambitious Norway combated; So frown'd he once, when, in an angry parle, He smote the sledded Polacks on the ice. 'Tis strange. MARCELLUS Thus twice before, and jump at this dead hour, With martial stalk hath he gone by our watch. HORATIO In what particular thought to work I know not; But in the gross and scope of my opinion, This bodes some strange eruption to our state. MARCELLUS Good now, sit down, and tell me, he that knows, Why this same strict and most observant watch So nightly toils the subject of the land, And why such daily cast of brazen cannon, And foreign mart for implements of war; Why such impress of shipwrights, whose sore task Does not divide the Sunday from the week; What might be toward, that this sweaty haste Doth make the night joint-labourer with the day: Who is't that can inform me? HORATIO That can I; At least, the whisper goes so. Our last king, Whose image even but now appear'd to us, Was, as you know, by Fortinbras of Norway, Thereto prick'd on by a most emulate pride, Dared to the combat; in which our valiant Hamlet-- For so this side of our known world esteem'd him-- Did slay this Fortinbras; who by a seal'd compact, Well ratified by law and heraldry, Did forfeit, with his life, all those his lands Which he stood seized of, to the conqueror: Against the which, a moiety competent Was gaged by our king; which had return'd To the inheritance of Fortinbras, Had he been vanquisher; as, by the same covenant, And carriage of the article design'd, His fell to Hamlet. Now, sir, young Fortinbras, Of unimproved mettle hot and full, Hath in the skirts of Norway here and there Shark'd up a list of lawless resolutes, For food and diet, to some enterprise That hath a stomach in't; which is no other-- As it doth well appear unto our state-- But to recover of us, by strong hand And terms compulsatory, those foresaid lands So by his father lost: and this, I take it, Is the main motive of our preparations, The source of this our wat"

    print get_chunked_word_frequency(s,'him', 20)



