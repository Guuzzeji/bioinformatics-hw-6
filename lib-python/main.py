import sys
from Bio import Align

# Create aligner
aligner = Align.PairwiseAligner(match_score=1.0)

# Create sequences to compare
target = sys.argv[1] if len(sys.argv) != 1 else "GATTACA" 
query = sys.argv[2] if len(sys.argv) != 1 else  "GCATGCU"

# Compare sequences and get score
score = aligner.score(target, query)
alignments = aligner.align(target, query)

# Print results to screen
print("Alignment for " + target + " " + query + "")
for alignment in alignments:
    print(alignment)

print("Alignment Score --> " + str(score))