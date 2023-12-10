# Binary Buccaneers

ABB Marine Hackathon 2023

## Our solution

Our team has developed a solution that allows the crew to monitor and act upon the current energy consumption, generation and storage on a ship.

In practice the solution is a web application that can be accessed by the crew or other relevant personnel. We have used (imaginary) historic data to costruct a prediction model, which is then used to predict the energy consumption, generation and storage during the selected route. By comparing the forecast to live data from the trip, we can identify anomalies and other events during which the crew can take note or action to optimize the energy consumption.

## How to run

You can access the web application at [https://penguin-pilot.herokuapp.com/](https://penguin-pilot.herokuapp.com/)

## Technologies used

- Data generation: Python
- Frontend: React (including libraries such as chart.js)

## Logic behind the solution

The solution is based on the assumption that ships often run their engines inefficiently, causing unneeded emissions.
By optimising the engines according to the immediate energy needs (propulsion, equipment/housing, heating/cooling) and the capability to store energy, we can reduce emissions.
One real use case is to instruct beginner captains who may not be aware that they are in a situation where they can turn off some of the engines by scaling up the other ones.

## Credits for third party assets and libraries

- Icons made by [Freepik](https://www.flaticon.com/authors/freepik) from [Flaticon](https://www.flaticon.com/)
