class Canvas {
    
    constructor (select) {
        
        this.canvas = document.querySelector(select);
        
        this.context = this.canvas.getContext('2d');
        
        this.init();
        
        this.event(); }
    
    init () {
        
        this.swiped = null;
        
        this.key = { up: null, press: null, down: null};
    
        this.position = { top : null, right : null, bottom : null, left : null }

        this.mouse = {up: { x: null, y: null }, move: { x: null, y: null }, down: { x: null, y: null } };

        this.touch = { start: { x: null, y: null }, move: { x: null, y: null }, end: { x: null, y: null } };
        
        this.canvas.width = parseInt(window.getComputedStyle(this.canvas).getPropertyValue('width'), 10);
        
        this.canvas.height = parseInt(window.getComputedStyle(this.canvas).getPropertyValue('height'), 10);

        this.position.top = this.canvas.getBoundingClientRect().top;

        this.position.right = this.canvas.getBoundingClientRect().right;

        this.position.bottom = this.canvas.getBoundingClientRect().bottom;

        this.position.left = this.canvas.getBoundingClientRect().left; }
    
    event () {
        
        ///> mouse olayları
        
        window.addEventListener('mousedown', function (evnt) {
            
            this.mouse.move.x = this.mouse.move.y = null;

            this.mouse.down.x = evnt.clientX - this.position.left;

            this.mouse.down.y = evnt.clientY - this.position.top; }.bind(this), false);
        
        
        window.addEventListener('mousemove', function (evnt) {

            this.mouse.move.x = evnt.clientX - this.position.left;

            this.mouse.move.y = evnt.clientY - this.position.top; }.bind(this), false);
        
        
        window.addEventListener('mouseup', function (evnt) {

            this.mouse.up.x = this.mouse.down.x || this.mouse.move.x;
            
            this.mouse.up.y = this.mouse.down.y || this.mouse.move.y; }.bind(this), false);
        
        
        window.addEventListener('mouseout', function (evnt) {
            
            this.mouse.down.x = this.mouse.down.y = null;

            this.mouse.move.x = this.mouse.move.y = null;

            this.mouse.up.x = this.mouse.up.y = null; }.bind(this), false);
        
        
        ///> MOBİL İÇİN
        
        window.addEventListener("touchstart", function (evnt) {
            
            this.touch.start.x = evnt.changedTouches[0].clientX - this.position.left;
            
            this.touch.start.y = evnt.changedTouches[0].clientY - this.position.top; }.bind(this), false);
        
        
        window.addEventListener("touchmove", function (evnt) {

            this.touch.move.x = evnt.changedTouches[0].clientX - this.position.left;
            
            this.touch.move.y = evnt.changedTouches[0].clientY - this.position.top; }.bind(this), false);
        
        
        window.addEventListener("touchend", function (evnt) {

            this.touch.end.x = evnt.changedTouches[0].clientX - this.position.left;
            
            this.touch.end.y = evnt.changedTouches[0].clientY - this.position.top;
            
            let distX = this.touch.end.x - this.touch.start.x;

            let distY = this.touch.end.y - this.touch.start.y;
            
            if (Math.abs(distY) >= 100 && Math.abs(distX) <= 80) { this.swiped = (distY < 0) ? 'up' : 'down'; }
            
            if (Math.abs(distX) >= 100 && Math.abs(distY) <= 80) { this.swiped = (distX < 0) ? 'left' : 'right'; } }.bind(this), false);
        
        
        ///> klavye olayları

        window.addEventListener('keydown', function (evnt) { this.key.down = evnt.keyCode; }.bind(this), false);

        window.addEventListener('keypress', function (evnt) { this.key.press = evnt.keyCode; }.bind(this), false);

        window.addEventListener('keyup', function (evnt) { this.key.up = evnt.keyCode; }.bind(this), false);
        
        
        window.addEventListener('resize', function () { this.init(); }.bind(this), false);
        
        window.addEventListener('scroll', function () { this.init(); }.bind(this), false);
    
    };
    
    setGrid (size) {
        
        this.grid = {};
        
        // her bir karenin genişliği
        
        this.grid.size = size;
        
        this.grid.left = (this.canvas.width % this.grid.size) / 2;
        
        this.grid.top = (this.canvas.height % this.grid.size) / 2;
        
        this.grid.right = this.canvas.width - this.grid.left;
        
        this.grid.bottom = this.canvas.height - this.grid.top;
        
        this.grid.width = (this.grid.right - this.grid.left) / this.grid.size;
        
        this.grid.height = (this.grid.bottom - this.grid.top) / this.grid.size;
        
        this.grid.birimKare = this.grid.height * this.grid.width;
        
        return this.grid;
        
    }
    
    drawGrid (){
        
        this.clear();
        
        for (var a = this.grid.left; a <= this.grid.right; a += this.grid.size) {
            
            for (var b = this.grid.top; b <= this.grid.bottom; b += this.grid.size ) {

                this.context.beginPath();
                
                this.context.shadowColor = 'rgb(0,0,0,0)';
                
                this.context.strokeStyle = 'rgba(255,255,255,0.6)';
                
                this.context.lineWidth = 0.5;
                
                cs.context.arc(a, b, 1, 0, Math.PI * 2, true);
                
                this.context.stroke();

                this.context.closePath();
                
            }
            
        }
        
    }
    
    clear (fillstyle) {
        
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (fillstyle) {
            
            this.context.beginPath();
            
            this.context.shadowColor = "rgba(0,0,0,0)";
            
            this.context.fillStyle = fillstyle;
            
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.context.closePath(); } };
    
    toggleFullscreen (select) {
        
        var elem = select ? document.querySelector(select) : this.canvas;
        
        if (!document.fullscreenElement) {
            
            elem.requestFullscreen().then({}).catch(err => { alert(`BİR HATA OLUŞTU : ${err.message} (${err.name})`); });
        
        } else { document.exitFullscreen(); }
    
    }
    
    random (min, max) {
        
        min = Math.ceil(min);
        
        max = Math.floor(max);
        
        return Math.floor(Math.random() * (max - min)) + min; };
    
    local(name, value) {
        
        if(value) { localStorage.setItem(name, value) }
        
        else { return localStorage.getItem(name); }
    
    }
    
    select (QuerySelect) { return document.querySelector(QuerySelect); }
    
    rgb (red = this.random(0, 256), green = this.random(0, 256), blue = this.random(0, 256), alpha = 1.0) {
        
        return "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
    };
    
    static ready (fn) { window.onload = function () { return fn(); } };
}