let a = 10
let b = 5
let c = 20
let d = 40

// without and operator

if(a>b){
    if(a>c){
        if(a>d){
            console.log(a)
        }
        else{
            console.log(d)
        }
    }
    else{
       if(c>d){
        console.log(c)
       }
       else{
        console.log(d)
       }
    }
}
else{
    if(b>c){
        if(b>d){
            console.log(b)
        }
        else{
            console.log(d)
        }
    }
    else{
        if(c>d){
            console.log(c)
        }
        else{
            console.log(d)
        }
    }
}
