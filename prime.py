import math

def checkPrime(n):
    for i in range(2, math.sqrt(n)+1):
        if n%i==0:
            return False

    return True