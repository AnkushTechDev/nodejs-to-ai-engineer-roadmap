"""Optional Python 3 companion; standard library only, no training or server."""
import json
from statistics import mean

features = [[0.2, 0.8], [0.9, 0.1]]
print(json.dumps({"schemaVersion": 1, "featureMeans": [mean(row) for row in features]}))
