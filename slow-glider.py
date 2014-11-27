# Slow glider page, for Mozilla CA presentation

import golly as g
from glife.base import glider, flip_x
import time

# Conway's Life
g.setrule("B3/S23")

glider.display("Slow Glider", x=-20, y=20, A = flip_x)
g.setpos('0', '0')
g.setoption('fullscreen', True)
g.setstep(0)

while True:
    time.sleep(.5)
    g.step()
    g.update()
