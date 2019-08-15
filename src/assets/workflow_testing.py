filename = "./workflow_garbage"
fileext  = ".txt"

output = open(filename+"-o"+fileext, "w")

with open(filename+fileext) as f:
    for line in f:
        print(line);
        
output.close()
print("Success")
