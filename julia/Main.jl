#=
    Nintendo Parental Control Master Key Calculator

    This is the main project of the Pkg package
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


=#

include("./libs/crc32.jl")

using .CRC32


module NintendoReset
    #=
        Install the NintendoReset module

        using Pkg
        Pkg.add("NintendoReset")

        =================================

        This class is used to calculate the master key for reset parental control,
        provided by the Nintendo manufacturer.

        Attributes:
            serial_number: The serial number of the device or the confirmation number.
            date_device: The date of the device.


        Extra:
            roll, xor, ex: The parameters used to calculate the master key.
    =#
    function reset(serial_number::String, month::String, day::String)
        roll = 0x14c1; xor = 0xaaaa; ex = 100000;
        alphabet = r"[0-9]+" # "[0-9a-fA-F]+" All Numbers

        if !occursin(alphabet, serial_number) || length(serial_number) != 8
            # Validate
            println("The serial number must be in the format of 8 digits")
            return
        end

        # The date must be in the format of MMDD
        # The month and day must be in range
        date = *(month, day)
        if !occursin(alphabet, date) || length(date) != 4
            # Validate
            println("The date must be in the format of MMDD")
            return
        end

        # Calculate the master key
        # The master key is the CRC32 checksum of the serial number and the date
        # The result of the CRC32 checksum is XOR with 0xaaaa
        # The result of the XOR is multiplied by 100000
        # The result of the multiplication is added to 0x14c1
        # The result of the addition is the master key
        master_key = CRC32.crc32(*(date, serial_number[5:8])) # CRC32.crc32(serial_number + date)

        return ((master_key ⊻ xor ) + roll) % ex


    end
end

#=

    Nintendo Parental Control Master Key Calculator

    Example:
                   _
          _       _ _(_)_     |  Documentation: https://docs.julialang.org
         (_)     | (_) (_)    |
          _ _   _| |_  __ _   |  Type "?" for help, "]?" for Pkg help.
         | | | | | | |/ _` |  |
         | | |_| | | | (_| |  |  Version 1.8.3 (2022-11-14)
        _/ |\__'_|_|_|\__'_|  |  Official https://julialang.org/ release
       |__/                   |

        julia> using Pkg
        julia> Pkg.add("NintendoReset")
        julia> using NintendoReset
        julia> print(reset("54033620", "12", "26"))
        11253

=#
# print(reset("54033620", "12", "26"))

