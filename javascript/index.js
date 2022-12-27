/*
    Nintendo Parental Control Master Key Calculator

    This is the main project of the npm package
    This module is used to calculate the master key for reset parental control, provided by the Nintendo manufacturer.
    Author: Zheng Lin Lei
    Date: 2022-12-26
    License: MIT

    =================================

    This library help us to calculate the master key for reset parental control, provided by the Nintendo manufacturer.
    # This program is distributed in the hope that it will be useful,
    # but WITHOUT ANY WARRANTY; without even the implied warranty of
    # MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    # GNU General Public License for more details.

    =================================



    MIT License
    © 2022 ZhengLinLei <zheng9112003@icloud.com>

    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the
    "Software"), to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
    LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
    WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


*/

const CRC32 = require("./libs/crc32"); // Import the CRC32 module


class MasterKey{
    /*
    This class is used to calculate the master key for reset parental control,
    provided by the Nintendo manufacturer.

    Attributes:
        serial_number: The serial number of the device or the confirmation number.
        date_device: The date of the device.


    Extra:
        roll, xor, ex: The parameters used to calculate the master key.
    */
    roll = 0x14c1; xor = 0xaaaa; ex = 100000;

    alphabet = "[0-9]+"; // The alphabet used to validate the serial number and date

    constructor(serial_number, month_device, day_device){
        this.crc32 = new CRC32(); // Create a CRC32 object

        // ========================

        this.serial_number = serial_number;
        try{
            // Validate the serial number
            if(!parseInt(this.serial_number) || this.serial_number.length != 8 || !this.serial_number.match(this.alphabet)){
                throw "The serial number must be in the format of 8 digits";
            }
            
        } catch (e){
            console.error(e);
            return;
        }

        this.date_device = month_device + day_device;
        // The date must be in the format of MMDD
        // The month and day must be in range
        try{
            // Validate the date
            if(!parseInt(this.date_device) || this.date_device.length != 4 || !this.date_device.match(this.alphabet)){
                throw "The date must be in the format of MMDD";
            }
        } catch (e){
            console.error(e);
            return;
        }

        this.master_key = this.calculate(); // Calculate the master key
    }

    getMasterKey(){
        /*
        Get the master key.

        Returns:
            The master key.
        */
        return this.master_key;
    }

    calculate(){
        
        // ========================

        /*
            Calculate the master key.
            
            Returns:
                The master key.
        
        */

        // ========================

        // Calculate the master key

        let crc = this.crc32.crc32(this.date_device + this.serial_number.slice(4, 8));
        // The crc will be 8 digits long 4 digits from date and 4 digits from serial number [4:8]
        // Calculate the CRC32 of the serial number and date with default initial value 0xffffffff

        return ((((crc ^ this.xor) >>> 0) + this.roll) >>> 0) % this.ex; // Calculate the master key
    }
}



/*

    Nintendo Parental Control Master Key Calculator

    Example:
        > const MasterKey = require("nintendo-reset");
        > let str = new MasterKey("54033620", "12", "26")
        > console.log(str.getMasterKey())
        11253


*/
// let str = new MasterKey("54033620", "12", "26")
// console.log(str.getMasterKey())
    

// If exist node environment, export the module
if(typeof module !== "undefined") module.exports = MasterKey;