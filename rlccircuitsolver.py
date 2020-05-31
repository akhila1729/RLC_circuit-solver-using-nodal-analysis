# -*- coding: utf-8 -*-
"""
Created on Sun May 31 13:08:33 2020

@author: ASUS
"""
# I solve the circuit by nodal anlaysis. The method of solving is explained below using an example
#[main][find]=[res]
# Eg: for a rc series circuit
# Number of nodes:3  Example input:
#element1=v n1,n2=0,1 value=1 voltage number=0
#element2=r n1,n2=1,2 value=1 
#elemnt3=c n1,n2=2,0 value=1 capacitor number=0
#Equations: (v1-v2)/r-i_v=0; (v2-v1)/r +i_c=0; v2(n)/h-i_c/c =v2(n-1)/h ;v1=v
#main=[[1/r,-1/r,0,-1],[-1/r,1/r,1,0],[0,1/h,-1/c,0],[1,0,0,0]]
#find=[v1,v2,i_c,i_v] ; res=[0,0,v2(n-1)/h,v]
#find stores the voltage and current values in the order:v1,v2..,I_c1,Ic2..,I_l1,I_l2..Iv1,Iv2..
import numpy as np
import matplotlib.pyplot as plt
print("Enter the total number of nodes in the circuit")
node=int(input())
#defining the 2-d arrays
e=np.array([['']*node]*node)
val=np.array([[0.0]*node]*node)
total_element=0
cap=np.array([[0]*node]*node)
volt=np.array([[0]*node]*node)
induc=np.array([[0]*node]*node)
#function to input values
def inertia(a):
    print("Enter the node1")
    n11=int(input())
    print("Enter the node2")
    n22=int(input())
    print("Enter the value of element")
    vv=float(input())
    if a=='c':
        print("Enter the capacitor number")
        cap[n11][n22]=int(input())
    if a=='v':
        print("Enter the voltage number")
        volt[n11][n22]=int(input())
    if a=='l':
        print("Enter the inductor number")
        induc[n11][n22]=int(input())
    val[n11][n22]=vv
    e[n11][n22]=a
r_count=0  
c_count=0
l_count=0  
v_count=0
i=0   
print("Enter the element")
a=input()

while a!='@':
    
    if (a=='r'):
        r_count=r_count+1
        total_element=total_element+1
        inertia(a)
    if (a=='l'):
        l_count=l_count+1
        total_element=total_element+1
        inertia(a)
    if (a=='c'):
        c_count=c_count+1
        total_element=total_element+1
        inertia(a)
    if (a=='v'):
        v_count=v_count+1
        total_element=total_element+1
        inertia(a)
    print("Enter the element")
    a=input()

n=node+c_count+l_count+v_count-1 #defining the matrix   
main=np.array([[0.0]*n]*n)
res=np.array([0.0]*n)
find=np.array([0.0]*n)

#values to plot
current=[]
time=[]

h=1/10000.0
#print(main)
for i in range(1,node):
    for j in range(node):
        if (e[i][j]=='r'):
            #print('a')
            main[i-1][i-1]=main[i-1][i-1]+1/val[i][j]
            if j!=0:
                main[i-1][j-1]=main[i-1][j-1]-1/val[i][j]
            #print(main)
        
        if (e[j][i]=='r'):
            #print('a1')
            main[i-1][i-1]=main[i-1][i-1]+1/val[j][i]
            if j!=0:
                main[i-1][j-1]=main[i-1][j-1]-1/val[j][i]
            #print(main)
        
        if (e[i][j]=='c'):
            #print('b')
            main[i-1][node-1+cap[i][j]]=main[i-1][node-1+cap[i][j]]+1
            main[node-1+cap[i][j]][i-1]=main[node-1+cap[i][j]][i]+1/h
            if j!=0:
                main[node-1+cap[i][j]][j-1]=main[node-1+cap[i][j]][j-1]-1/h
            main[node-1+cap[i][j]][node-1+cap[i][j]]=-1/val[i][j]
            #print(main)
            
        if (e[j][i]=='c'):
            #print('b1')
            main[i-1][node-1+cap[j][i]]=main[i-1][node-1+cap[j][i]]-1
            main[node-1+cap[j][i]][i-1]=main[node-1+cap[j][i]][i-1]-1/h
            if j!=0:
                main[node-1+cap[j][i]][j-1]=main[node-1+cap[j][i]][j-1]+1/h
            main[node-1+cap[j][i]][node-1+cap[j][i]]=main[node-1+cap[j][i]][node-1+cap[j][i]]-1/val[j][i]
            #print(main)
            
        if (e[i][j]=='l'):
            #print('c')
            main[i-1][node-1+induc[i][j]+c_count]=main[i-1][node-1+induc[i][j]+c_count]+1
            main[node-1+c_count+induc[i][j]][i-1]=main[node-1+c_count+induc[i][j]][i-1]+1
            if j!=0:
                main[node-1+c_count+induc[i][j]][j-1]=main[node-1+c_count+induc[i][j]][j-1]-1
            main[node-1+c_count+induc[i][j]][node-1+c_count+induc[i][j]]=-val[i][j]/h
            
        if (e[j][i]=='l'):
            #print('c1')
            main[i-1][node-1+induc[j][i]+c_count]=main[i-1][node-1+induc[j][i]+c_count]-1
            main[node-1+c_count+induc[j][i]][i-1]=main[node-1+c_count+induc[j][i]][i-1]-1
            if j!=0:
                main[node-1+c_count+induc[j][i]][j-1]=main[node-1+c_count+induc[j][i]][j-1]+1
            main[node-1+c_count+induc[j][i]][node-1+c_count+induc[j][i]]=-val[j][i]/h
            
        if (e[i][j]=='v'):
            #print('d')
            main[i-1][node-1+c_count+l_count+volt[i][j]]=1
            main[node-1+c_count+l_count+volt[i][j]][i-1]=1
            if j!=0:
                main[node-1+c_count+l_count+volt[i][j]][j-1]=-1
            #print(main)
                
        if (e[j][i]=='v'):
            #print('d1')
            #print(i-1)
            #print(node-1+c_count+l_count+volt[j][i])
            main[i-1][node-1+c_count+l_count+volt[j][i]]=-1
            main[node-1+c_count+l_count+volt[j][i]][i-1]=1
            if j!=0:
                main[node-1+c_count+l_count+volt[j][i]][j-1]=-1
            #print(main)

print(main)
              
y=np.linalg.inv(main)

for m in range(100000):
    res=np.array([0.0]*n)
    for i in range(1,node):
        for j in range(node):
            if (e[i][j]=='c'):
                if j!=0:
                    res[node-1+cap[i][j]]=res[node-1+cap[i][j]]+(find[i-1]-find[j-1])/h
                if j==0:
                    res[node-1+cap[i][j]]=res[node-1+cap[i][j]]+(find[i-1])/h
                    
            if (e[j][i]=='c'):
                if j!=0:
                    res[node-1+cap[j][i]]=res[node-1+cap[j][i]]+(find[j-1]-find[i-1])/h
                if j==0:
                    res[node-1+cap[j][i]]=res[node-1+cap[j][i]]+(-find[i-1])/h
                    
            if (e[i][j]=='l'):
                res[node-1+c_count+induc[i][j]]=-val[i][j]*find[node-1+c_count+induc[i][j]]/h
                
            if (e[j][i]=='l'):
                res[node-1+c_count+induc[j][i]]=-val[j][i]*find[node-1+c_count+induc[j][i]]/h
                
            if (e[i][j]=='v'):
                res[node-1+c_count+l_count+volt[i][j]]=-val[i][j]
                
            if (e[j][i]=='v'):
                res[node-1+c_count+l_count+volt[j][i]]=val[j][i]
                
    find=np.matmul(y,res)
    time.append(m*h)
    #to find the current across any element update the statement inside append
    current.append(find[0])
                    
                    
print(find)
#print(find[0]-find[1])
#print(current)
plt.plot(time,current)
plt.show()          









