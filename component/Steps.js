export const steps = [
    {
        id: '1',
        message: 'hello ,these is hrithik',
        trigger: '2'    //trigger is the key to call the next action 
    },
    
    {
        id: '2',          //action her is determine as id
        message: 'welcome to fintech',
        trigger: '3'
    },
    // now use can reply
    {
        id: '3',
        user: true,
        trigger: '4'
    },
    {
        id: '4',
        options: [
            {value: 'yes', label: 'yes' , trigger: '5'},
            {value: 'no', label: 'no' , trigger: '6'}
        ]
    },
    //now the option ....user can choose the option between
    //https://www.youtube.com/watch?v=InyGLGgJ-24
    {
        id: '5',
        message: 'you choose Yes',
        trigger: ([value, steps]) => {
            alert(JSON.stringify(steps))
            return '7';
       }
    },
    {
        id: '6',
        message: 'you choose No',
        end: true
    },
    {
        id: '7',
        message: 'okay',
        end: true
    },
    
    
]