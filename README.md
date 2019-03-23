This project is a homework activity for the UT coding bootcamp. It is the beginning of a multi-step RPG which allows fighting mimicing Pokemon the gameboy game. 

It is definitely not finished and does not get to round 2. It looks fairly nice, even without the images and stuff added, you could see what I was going for with the styling..


And the javascript = is a convoluted mess.. I will admit, the code is as wet as can be, and I'm doing what I'm sure is some gross stuff with eval(concatenated strings) == variable names
.. but it is what I have in my toolkit currently and its getting on the right tracks.

The learning lesson was the important thing here right... ? I definitely learned. and learned that thinking I did adequate planning... I went in like the wild west and got confused, lost, and complex(not in a good way) code... I think it would take me a good bit of frustrating head banging on wall time to debug and unblock the rest of the game (I hope, even though the code is wet, I hope I wrote it abstract enough that multiple iterations can be run...)


The psuedocode to finish:
I have a bug with one of my variables being shadowed (although could be a problem with the fact that I am creating another set of the same buttons after blowing the first set away with .attr("style","display:none").. either way the issue) is not allowing the second (or eventually third) round of play to continue. Definitely need to trouble shoot that.

I need to do some $('locator').html .. .text .append to move some more info into the HeadsUpDisplay at the top of the page which should have representative images and more data on Battle Start (did you notice the tooltips I played around with on Pikachu and Squirtle?)

I also wanted to get rid of the alerts I am currently using for end game state and replace with an onScreen message and freeze everything so that you have to do a reset, since some of the buttons are still live (though some I wrapped in a blocking if statement)


https://jbloodbeardn.github.io/unit-4-game/
