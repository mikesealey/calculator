# calculator

I wasn't quite as diligent at uploading to github as I could have been, and as a result the online version history is very #restoftheowl
https://www.reddit.com/r/funny/comments/eccj2/how_to_draw_an_owl/

As for a process, I styled the project around a picture of a calculator turned up in google-images.  I did have a nice font that mimics a 
7-segment LED character display, but for some unknown reason it displayed the same thing for "-" minus symbols as it did for "." decimal point.

Once I got over the first hurdle of 1+1=11 my initial script worked well for simple calculations (1+2=3).
The tricky part came when creating logic to handle string (1+2+3+4), and staggered-string (1+2 = 3, +4=7, +5=12) calculations. 

There are still a handful of artifacts I'd like to address, but for now (07/12/22) this functions well as a Minimum-Viable-Product.

Still on the to-do list
- SCRIPT address the rounding issues with floating-point numbers and IEEE754 (0.2*3=0.6000000001)
- 
- SCRIPT/STYLE No obvious way to change polarity(?) of a number - current setup treats the "-" button as subtract only.
    consider adding "+/-" button and function
- 
- STYLE Find a better font that suits the style and works with all mathematical operators
- STYLE numbers greater than 16 characters will overflow indeffinately.  
    currentOperand is limited to ~15 but multiplying by 999 circumnavigates this solution
