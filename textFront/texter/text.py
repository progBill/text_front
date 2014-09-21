import matrix 
from string import punctuation

class Word:
    def __init__(self, word):
        self.word=word
        self.qual={}

    def set_quality(self, key, val):
        self.qual[key]=val

    def __str__(self):
        return self.word

class Text:

    def __init__(self, unbroken_text, num_chunk=None, len_chunk=300):
        nopunc_txt = unbroken_text.translate(None, punctuation)
        self.words = [Word(x) for x in nopunc_txt.split()]
        self.chunks=[]
        self.unigram={}
        self.get_matrix()

        # ordered list of words
        if num_chunk:
            #TODO: I think below will leave some words off 
            n=len(self.words)/num_chunk
            for i in range(n):
                self.chunks.append([x for x in self.words[i:i+n]])
        elif len_chunk:
            n=self.len_chunk/len(self.words)
            for i in range(n):
                self.chunks.append([x for x in self.words[i:i+n]])

        # dict of token:num_appearing
        for lst in self.chunks:
            for x in lst:
                if x in self.unigram.keys():
                    self.unigram[x]+=1
                else:
                    self.unigram[x]=1

    def get_matrix(self):
        self.m = matrix.Matrix(self.words)
        self.matrix = self.m.get_matrix()
        self.index = self.m.get_index()

    def __str__(self):
        return ' '.join([str(x) for x in self.words])



