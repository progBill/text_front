# -*- coding: utf-8 -*-
from nltk.tokenize import word_tokenize
from nltk.probability import FreqDist
from itertools import *

def get_tokens(s):
    '''Returns a list of word tokens'''
    return word_tokenize(s.encode('utf-8'))

def get_longest_words(s):
    pass

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



