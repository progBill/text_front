# -*- coding: utf-8 -*-
from nltk.tokenize import word_tokenize
from nltk.probability import FreqDist
from itertools import *

def get_tokens(s):
    '''Returns a list of word tokens'''
    return word_tokenize(s)

def lexical_diversity(s):
    '''Provides a measure of lexical diversity'''
    num_tokens = len(get_tokens(s))
    num_unique_tokens = len(set(get_tokens(s)))
    # * 1.0 below to make sure we're playing with floats
    return num_tokens * 1.0 / num_tokens

def get_freq_dist_dict(s):
    '''Returns a dict with words as keys and appearance count as value'''
    d={}
    d.update([(x,y) for x,y in FreqDist(get_tokens(s.decode('utf-8'))).iteritems()])
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
    suite = unittest.TestLoader().loadTestsFromTestCase(TestNLTKFunctions)
    unittest.TextTestRunner(verbosity=2).run(suite)



