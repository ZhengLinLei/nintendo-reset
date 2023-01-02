# Julia Nintendo Master Key Generator

## Installation

### From Pkg (Recommended, but not yet available)
```julia
using Pkg
Pkg.add("NintendoReset")
```

### From Source
```bash
git clone https://github.com/ZhengLinLei/nintendo-reset.git

cd nintendo-reset/julia
```

## Usage

```julia

# Import if you have downloaded the source
#=
    project
    ├── libs
    │   ├── Main.jl
    │   └── libs
    │       └── crc32.jl
    |
    └── Script.jl (Your script)

=#
# include("libs/Main.jl")

using NintendoReset

# Generate the master key for the Nintendo DS
print(reset("54033620", "12", "26"))
# Output: 11253
```


## Contributing

To contribute the project, please read the [../CONTRIBUTING.md](../CONTRIBUTING.md) file.



## License

MIT License