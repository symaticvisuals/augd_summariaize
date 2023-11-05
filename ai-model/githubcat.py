
# import turtle as t
# from PIL import Image

# # Set up the turtle screen
# screen = t.Screen()
# screen.bgcolor("white")
# screen.title("Turtle Image Drawing (Color with White Pixels Empty)")

# # Load the image and resize it to match the Turtle window aspect ratio
# image = Image.open(r'C:\Users\komal\Downloads\privateGPT\OIP.jpeg')
# image.thumbnail((400, 400))  # Adjust the size as needed

# # Set up the turtle
# pen = t.Turtle()
# pen.speed(0)  # Set the turtle's speed to the maximum
# pen.hideturtle()  # Hide the turtle while drawing

# # Get image dimensions
# width, height = image.size

# # Function to draw the image with colors while keeping white pixels empty
# def draw_image():
#     t.tracer(0)  # Disable screen updates
    
#     pixel_width = width // 2
#     pixel_height = height // 2
    
#     for y in range(pixel_height, -pixel_height, -1):
#         pen.penup()
#         pen.goto(-pixel_width, y)
        
#         for x in range(-pixel_width, pixel_width):
#             pixel = image.getpixel((x + pixel_width, pixel_height - y))
#             if sum(pixel) < 765:  # Check if the pixel is not white (white = 255 + 255 + 255)
#                 r, g, b = [val / 255 for val in pixel]  # Normalize RGB values to [0, 1]
#                 pen.pendown()
#                 pen.pencolor(r, g, b)
#             else:
#                 pen.penup()
                
#             pen.forward(1)
        
#         t.update()  # Update the screen after each row is drawn

# # Draw the multicolor image while keeping white pixels empty
# draw_image()

# # Close the window when clicked
# screen.exitonclick()
import turtle as t
from PIL import Image

# Set up the turtle screen
screen = t.Screen()
screen.bgcolor("white")
screen.title("Turtle Image Drawing with Circular Frame")

# Load the image and resize it to match the Turtle window aspect ratio
image = Image.open(r'C:\Users\komal\Downloads\privateGPT\OIP.jpeg')
image.thumbnail((400, 400))  # Adjust the size as needed

# Set up the turtle
pen = t.Turtle()
pen.speed(0)  # Set the turtle's speed to the maximum
pen.hideturtle()  # Hide the turtle while drawing

# Get image dimensions
width, height = image.size

# Function to draw the image with colors while keeping white pixels empty
def draw_image():
    t.tracer(0)  # Disable screen updates
    
    pixel_width = width // 2
    pixel_height = height // 2
    
    for y in range(pixel_height, -pixel_height, -1):
        pen.penup()
        pen.goto(-pixel_width, y)
        
        for x in range(-pixel_width, pixel_width):
            pixel = image.getpixel((x + pixel_width, pixel_height - y))
            if sum(pixel) < 765:  # Check if the pixel is not white (white = 255 + 255 + 255)
                r, g, b = [val / 255 for val in pixel]  # Normalize RGB values to [0, 1]
                pen.pendown()
                pen.pencolor(r, g, b)
            else:
                pen.penup()
                
            pen.forward(1)
        
        t.update()  # Update the screen after each row is drawn
    pen.penup()
    pen.goto(0, -150)  # Move to the center of the circular frame
    pen.pendown()
    pen.pencolor("black")  # Color of the circular frame
    pen.pensize(2)  # Adjust the thickness of the frame
    pen.circle(150)  # Draw a circular frame

# Draw the multicolor image while keeping white pixels empty
draw_image()

# Draw a circular frame around the image

# Close the window when clicked
screen.exitonclick()
