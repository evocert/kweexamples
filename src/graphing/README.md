```
{
	"0000":{
		/-- mandatory
		name:"foo",
		/-- optional
		description:"foos description",
		/-- optional
		value:42,
		/-- optional
		properties:{
			"k0":"hello foo",
			"k1":"hello foo 2",
			...
		}
		value:42,
		children:{
			"0001":{/-- child instance
				name:"bar",
				description:"bars description",
				value:24,
				properties:{
					"k0":"hello bar",
					"k1":"hello bar 2",
					...
				}
				children:{
					"0002":["0000"],/-- reference
					"0003":["0000","0001"],/-- reference
				}
			},
			...
		}
	},
}
```
