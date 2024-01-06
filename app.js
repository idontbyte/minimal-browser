const webview = document.querySelector('webview')

document.getElementsByName('url')[0].addEventListener('keyup', function (e) {
    if (e.keyCode == 13) {
        var url = document.getElementsByName('url')[0].value;
        webview.loadURL(url);
    }
})

document.getElementById('closeButton').addEventListener('click', function (e) {
    window.ipcRender.send('window:close');
})
document.getElementById('minimizeButton').addEventListener('click', function (e) {
    window.ipcRender.send('window:minimize');
})
document.getElementById('maximizeButton').addEventListener('click', function (e) {
    window.ipcRender.send('window:maximize');
    e.target.style.display = 'none';
    document.getElementById('restoreButton').style.display = 'block';
})
document.getElementById('restoreButton').addEventListener('click', function (e) {
    window.ipcRender.send('window:restore');
    e.target.style.display = 'none';
    document.getElementById('maximizeButton').style.display = 'block';
})