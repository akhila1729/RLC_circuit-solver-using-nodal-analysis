# RLC_cirucit-solver-using-nodal-analysis
This solves the circuit using nodal analysis.
The folllowing explains how to input the values of the circuit.
Nodes of the circuit should be named from 0 to n-1 where n is the total number of nodes
n1,n2 denotes the end points of the elements and n1 and n2 must be taken in clockwise order only 
Capacitor, voltage, inductor number denotes the number given to identify the element when more than one same element are present.This should 
be named from 0 to c_no-1 or l_no-1 or v_no-1 where c_no,l_no and v_no denotes the total number of capacitors ,inductors and voltages respectively
The format of input is :
Element name ('r','c','l','v')(only lowercase allowed r=resistence c=capacitance l=inductance v=dc voltage)
n1
n2
value of element
element number(not for resistence)

The input loop ends when @ is typed for element name

Eg inputs:
1)
Enter the total number of nodes in the circuit

3

Enter the element

v

Enter the node1

0

Enter the node2

1

Enter the value of element

1

Enter the voltage number

0

Enter the element

c

Enter the node1

1

Enter the node2

2

Enter the value of element

1

Enter the capacitor number

0

Enter the element

l

Enter the node1

2

Enter the node2

0

Enter the value of element

1

Enter the inductor number

0

Enter the element

@

2)
3 v 0 1 1 0 r 1 2 1 c 2 0 1 0 @

3)
4 v 0 1 1 0 r 1 2 1 c 2 3 1 0 l 3 0 1 0 @
