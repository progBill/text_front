from collections import Counter
from nltk.probability import FreqDist
import nltk

def get_tokens(s):
    return sorted(set(nltk.word_tokenize(s)))

def lexical_diversity(s):
    # *1.0 to prevent integer division
    return len(set(s))*1.0 / len(s)

def get_word_counts(s):
    cntr = Counter( nltk.word_tokenize(s))
    return cntr

def get_word_count(c, w):
    return c[w]

def get_freq_dist(s):
    fd = FreqDist(w for w in get_tokens(s))
    return fd.most_common(50)


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

    def test_word_counts_is_dict(self):
        counter_dict = get_word_counts('this is my string!')
        self.assertTrue(len(counter_dict.keys()) == 5)

    def test_word_count(self):
        c_dict = get_word_counts("My string is a good string")
        self.assertTrue(get_word_count(c_dict, 'string') == 2)

    def test_freq_dist_tokens(self):
        fd = get_freq_dist('This is a string to get Freqy with.')
        self.assertTrue('Freqy' in fd)


if __name__ == '__main__':
    suite = unittest.TestLoader().loadTestsFromTestCase(TestNLTKFunctions)
    unittest.TextTestRunner(verbosity=2).run(suite)



