const log = console.log.bind(console)

const e = function(selector) {
    let element = document.querySelector(selector)
    if (element === null) {
        let s = `选择器 ${selector} 写错了！`
        alert(s)
        return null
    } else {
        return element
    }
}
const es = function(selector) {
    let elements = document.querySelectorAll(selector)
    if (elements.length === 0) {
        let s = `选择器 ${selector} 写错了！`
        alert(s)
        return []
    } else {
        return elements
    }
}
const bindAll = function(elements, eventName, callback) {
    for (let i = 0; i < elements.length; i++) {
        let tag = elements[i]
        tag.addEventListener(eventName, callback)
    }
}

let s = ' [[9,1,0,0,0,1,1,1,0],[1,1,0,0,1,2,9,1,0],[1,1,1,0,1,9,2,1,0],[1,9,2,1,1,1,1,0,0],[1,2,9,1,0,0,1,1,1],[1,2,1,1,0,1,2,9,1],[9,1,0,0,1,2,9,2,1],[1,2,1,1,1,9,2,1,0],[0,1,9,1,1,1,1,0,0]]'
let square = JSON.parse(s)

const templateCell = function(line, x) {
    let s = ''
    for (let i = 0; i < line.length; i++) {
        // let x = String(x)
        s += `<div class="cell" data-number="${line[i]}" data-x="${x}" data-y="${i}">${line[i]}</div>`
    }
    return s
}

const templateRow = function(square) {
    let s = ''
    for (let i = 0; i < square.length; i++) {
        let l = square[i]
        let s1 = templateCell(l, i)
        s += s1
    }
    return s
}

const renderSquare = function(square) {
    let row = templateRow(square)
    let div = e('#id-div-mine')
    div.insertAdjacentHTML('beforeend', row)
}

const appendImg = function() {
    let d0 = es('div[data-number="0"]')
    for (let i = 0; i < d0.length; i++) {
        let e = d0[i]
        e.style.fontSize = "0";
    }

    let d9 = es('div[data-number="9"]')
    for (let i = 0; i < d9.length; i++) {
        let e = d9[i]
        e.style.fontSize = "0";
        let html = '<img class="hide boom" src="images/boom.svg" alt="boom">'
        e.innerHTML += html
    }

    let dc = es('.cell')
    for (let i = 0; i < dc.length; i++) {
        let e = dc[i]
        let html = '<img class="hide flag" src="images/flag.svg" alt="flag">'
        e.innerHTML += html
    }
}

const bindEventDelegate = function() {
    let container = e('#id-div-mine')
    container.addEventListener('contextmenu', function(event) {
        event.preventDefault()
        self = event.target
        if (!self.classList.contains('opened')) {
            if (self.children[0].classList.contains('flag')) {
                self.children[0].classList.remove('hide')
            } else {
                self.children[1].classList.remove('hide')
            }
        }
    })
}

const vjkl = function(square) {
    let bs = es('.cell')
    let boom = es('.boom')
    let flag = es('.flag')
    bindAll(bs,'click', function(event) {
        let self = event.target
        let n = Number(self.dataset.number)
        if (n === 9) {
            // self.classList.add('boom')
            for (let i = 0; i < bs.length; i++) {
                let e = bs[i]
                e.classList.add('opened')
            }
            for (let i = 0; i < boom.length; i++) {
                let e = boom[i]
                e.classList.remove('hide')
            }
            for (let i = 0; i < flag.length; i++) {
                let e = flag[i]
                e.classList.add('hide')
            }
            alert('游戏结束！')

        } else if (n === 0) {
            self.classList.add('opened')
            let x = Number(self.dataset.x)
            let y = Number(self.dataset.y)
            vjklAround(square, x, y)
            self.style.fontSize = "0"
        } else {
            self.classList.add('opened')
            self.style.fontSize = "30px"
        }
    })
}

const vjklAround = function(square, x, y) {
    vjkl1(square, x - 1, y - 1)
    vjkl1(square, x, y - 1)
    vjkl1(square, x + 1, y - 1)
    vjkl1(square, x - 1, y)
    vjkl1(square, x + 1, y)
    vjkl1(square, x - 1, y + 1)
    vjkl1(square, x, y + 1)
    vjkl1(square, x + 1, y + 1)
}

const vjkl1 = function(square, x, y) {
    let n = square.length
    if (x >= 0 && x < n && y >= 0 && y < n) {
        let div = e(`div[data-x="${x}"][data-y="${y}"]`)
        if (!div.classList.contains('opened')) {
            let n = Number(div.dataset.number)
            if (n === 0){
                div.classList.add('opened')
                vjklAround(square, x, y)
            } else if (n !== 9) {
                div.classList.add('opened')
            }
        }
    }
}

const __main = function() {
    renderSquare(square)
    appendImg()
    vjkl(square)
    bindEventDelegate()
}
__main()