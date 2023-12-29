## ISSUES

- Lights Not Displaying After First Click:
It seems like there might be an issue with the initial state of the lights or the rendering logic. Ensure that the lights state is initially set correctly. If it doesn't work as expected, try to initialize the lights state inside the useMemoryMode hook based on the gameState. For example, if the initial state is 'initial', set the lights accordingly.

- Button Not Turning Off After User Input:
In the handleUserInput function, make sure the lights state is correctly updated. The turnOffLights function should set the corresponding lights to false. If it still doesn't work, check for any interference with the state.