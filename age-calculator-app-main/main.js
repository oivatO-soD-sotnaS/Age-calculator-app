const root = document.querySelector(':root');
const styles = getComputedStyle(root);
const data = new Date;
const button = document.querySelector('.arrow');
const birthData = [document.querySelector('#day'),
                    document.querySelector('#month'),
                    document.querySelector('#year')
                ]

button.addEventListener('click',() => {
    

    root.style.setProperty('--input-border-day','darkgrey');
    root.style.setProperty('--erro-day', "''");
    root.style.setProperty('--input-border-month','darkgrey');
    root.style.setProperty('--erro-month', "''");
    root.style.setProperty('--input-border-year','darkgrey');
    root.style.setProperty('--erro-year', "''");
    
    if(birthData[0].value == "" || birthData[0].value < 1 || birthData[0].value > 31) {
        root.style.setProperty('--input-border-day','red');
        root.style.setProperty('--erro-day', "'Must be a valid day'");
    }
    if(birthData[1].value == "" || birthData[1].value < 1 || birthData[1].value > 12){
        root.style.setProperty('--input-border-month','red');
        root.style.setProperty('--erro-month', "'Must be a valid month'");
    }
    if(birthData[2].value == "" || birthData[2].value > data.getFullYear()){
        root.style.setProperty('--input-border-year','red');
        root.style.setProperty('--erro-year', "'Must be in the past'");
    }

    if([styles.getPropertyValue('--input-border-year'),styles.getPropertyValue('--input-border-month'),styles.getPropertyValue('--input-border-day')].includes('red')){
        return;
    }
    calcYears();
})

console.log(styles.getPropertyValue('--input-border-year'))
console.log(data.getMonth()+1)
console.log(data.getDate())
function calcYears(){
    const birth = new Date(Number(birthData[2].value),Number(birthData[1].value)-1, Number(birthData[0].value));

    let years = data.getFullYear() - Number(birthData[2].value);
    if(Number(birthData[1].value) > data.getMonth()+1){
        years--;
    }else if(Number(birthData[0].value)  > data.getDate() && Number(birthData[1].value) >= data.getMonth()+1){
         years--;
    }

    let age = new Date(data.getFullYear(), data.getMonth() - birth.getMonth(), data.getDate() - birth.getDate())
    if(age.getMonth() == 11 && age.getDate() == 31) {
        animate(years, 0, 0);
        return
    }
        
    animate(years, age.getMonth(), age.getDate());
}

function animate(y, m , d){
    const spanYears = document.querySelector('.ux-year');
    const spanMonths = document.querySelector('.ux-month');
    const spanDays = document.querySelector('.ux-day');
    let [auxY,auxM,auxD] = [0,0,0];
    console.log(m)
    let timerY = setInterval(() => {
        spanYears.innerHTML = `${zeroAEsquerda(auxY)}`;
        if(spanYears.innerHTML == `${zeroAEsquerda(y)}`){
            clearInterval(timerY);
        }
        ++auxY;
    },40)

    let timerM = setInterval(() => {
        spanMonths.innerHTML = `${zeroAEsquerda(auxM)}`;
        if(spanMonths.innerHTML == `${zeroAEsquerda(m)}`){
            clearInterval(timerM);
        }
        ++auxM;
    },40)
    

    let timerD = setInterval(() => {
        spanDays.innerHTML = `${zeroAEsquerda(auxD)}`;
        if(spanDays.innerHTML == `${zeroAEsquerda(d)}`){
            clearInterval(timerD);
        }
        ++auxD;
    },40)


}

function zeroAEsquerda(x){
    return x < 10? "0" + x : x;
}