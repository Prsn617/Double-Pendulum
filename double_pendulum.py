import sys
import pygame
import random
import math

pygame.init()

pygame.display.set_caption("Double Pendulum")
WIDTH = 800
HEIGHT = 600
FPS = 60
screen = pygame.display.set_mode((WIDTH, HEIGHT))
clock = pygame.time.Clock()

BLACK = (0,0,0)
WHITE = (200, 200, 200)
RED = (200, 100, 100)
BLUE = (100, 100, 200)

x_offset = int(WIDTH / 2)
y_offset = 100
r1 = 150
r2 = 100
m1 = 10
m2 = 10
a1 = math.pi/4
a2 = math.pi/8
a1_vel = 0
a2_vel = 0
g = 10 / FPS
coords = []

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

    screen.fill((200, 200, 200))

    x1 = r1 * math.sin(a1) + x_offset
    y1 = r1 * math.cos(a1) + y_offset

    x2 = r2 * math.sin(a2) + x1
    y2 = r2 * math.cos(a2) + y1

    coords.append((x2,y2))

    pygame.draw.line(screen, BLUE, (x_offset, y_offset), (x1, y1), width=2)
    pygame.draw.circle(screen, RED, (x1, y1), m1)

    pygame.draw.line(screen, BLUE, (x1, y1), (x2, y2), width=2)
    pygame.draw.circle(screen, RED, (x2, y2), m2)


    num1 = -g*(2*m1*m2)*math.sin(a1)
    num2 = -m2*g*math.sin(a1 - 2*a2)
    num3 = -2*math.sin(a1 - a2)*m2
    num4 = a2_vel**2*r2+a1_vel**2*r1*math.cos(a1 - a2)
    denum = 2*m1+m2-m2*math.cos(2*a1 - 2*a2)

    a1_acc = (num1 + num2 + num3 * num4)/ (r1 * denum)

    num1 = 2*math.sin(a1 - a2)
    num2 = a1_vel**2*r1*(m1 + m2)
    num3 = g*(m1+m2)*math.cos(a1)
    num4 = a1_vel**2*r2*m2*math.cos(a1-a2)

    a2_acc = (num1)*(num2 + num3 + num4)/ (r2 * denum)

    a1_vel += a1_acc
    a2_vel += a2_acc
    a1 += a1_vel
    a2 += a2_vel

    for i in range(len(coords)-1):
        pygame.draw.line(screen, BLACK, coords[i+1], coords[i], width=1)


    clock.tick(FPS)
    pygame.display.update()


