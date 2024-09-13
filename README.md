# Device-Dashboard

A summary of all devices and their energy usages from wall outlets. This helps determine where electricity is mostly used in certain areas of a bulding and replace energy-hogging applicances, reducing their electricity bill.

## Instructions
1. Download files then create folder to store the files 
2. Open up command prompt and go to folder
3. Run using node command: node server.js
4. Open separate cmd prompt and navigate to downloaded folder

You can send a POST request using curl:

curl -X POST -H "Content-Type: application/json" -d "{\"energy-usage\": **[number]**}" http://localhost:3000/api/[device-ID]

- **[number]** is energy-usage
- **[device-ID]** is device's name or given ID

You can also send a GET request to retrieve data from command prompt of specified **device-ID**:

curl -X GET http://localhost:3000/api/[device-ID]

## Notes
- A device can track multiple usages (Device ID abc with usages 200,30,554,...)
- If a device's total energy usage is greater than 1000, then it will become red, indicating a excessive energy is used from the device's location.
- This was created as part of coursework on Summer 2023.
