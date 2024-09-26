from Bio import Align
from Bio.Align import substitution_matrices

aligner = Align.PairwiseAligner(match_score=1.0)
m = substitution_matrices.load("BLOSUM62")

target = "GAACT"
query = "GAT"
score = aligner.score(target, query)

alignments = aligner.align(target, query)


print(aligner.substitution_matrix)

for alignment in alignments:
    print(alignment)

print(score)