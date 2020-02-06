## 关于Electron

关于Electron，我们摘取了官网的原话

> Electron是由Github开发，用HTML，CSS和JavaScript来构建跨平台桌面应用程序的一个开源库。 Electron通过将Chromium和Node.js合并到同一个运行环境中，并将其打包为Mac，Windows和Linux系统下的应用来实现这一目的。


其实以我目前浅显的理解，Electron借由Chromium，很容易就能构建一个包含webview的app，然后因为这个app的底层是Chromium的，所以打包出来的app也分别能跑在Windows/Linux/Mac上面。

既然这是一个webview的应用，所以理论上我们完全可以通过react去开发web的那部分功能，本文就打算就这部分内容进行讲解。

## 用Electron Forge创建一个项目

Electron Forge 是Electron的一个常用工具，用来创建/发布/安装Electron应用。

通过一下命令来创建一个app

```
npx create-electron-app basicApp
cd basicApp
yarn start
```

正常来说你可以看到一个app如下图


![](https://user-gold-cdn.xitu.io/2020/2/5/17015d2b643b7da3?w=800&h=600&f=jpeg&s=227519)

查看src/index.js可以看到Electron的大致的启动流程：
在app ready的时候createWindow被调起，然后就是new了一个BrowserWindow，作为BrowserWindow的实例，mainWindow会去load本地的index.html。

```javascript

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 320,
    height: 600
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);
```

从以上的代码可以看到load的都是本地的html，现在我们要修改一下代码，让他load我们react的页面，注意我们只需要修改一行代码：


```javascript
  // change loadFile to load URL.
  // mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.loadURL('http://localhost:3000/');
```

接下来我们要建立我们react的项目

## 用create-react-app创建一个页面

```
mkdir react
cd react
npx create-react-app my-app
cd my-app
yarn start
```

如果以上的步骤没有问题，现在你就会发现在你的浏览器打开了一个本地的页面`http://localhost:3000/` 

由于之前已经启动了Electron，现在我们要让他重新载入本地的react的页面，我们可以先Cmd + Q把Electron退出，然后

```
cd ../../
yarn start # 注意这时候启动的是Electron，不是react
```

然后你就可以发现Electron里面已经是react的页面了。


![](https://user-gold-cdn.xitu.io/2020/2/6/1701873393ffc81d?w=800&h=600&f=jpeg&s=289645)

至此，我们electron + react的简单界面的基本结构算是搭建完成了。

## 用material-ui制作一个简单的登录界面

关于material-ui，官网的说法是：

> React 组件用于更快速、更简便的 web 开发。你也可以建立你自己的设计系统，或者从 Material Design 开始。

简单来说，帮你快速整UI

我们通过以下几个命令来安装他


```
# 切换到react的目录
cd react/my-app 
yarn add @material-ui/core @material-ui/icons
```

安装完之后启动react

```
yarn start
```

由于制作登录界面，我们需要又输入框，登录按钮之类的东西，不过这些material-ui都帮我们准备好了，我们只需要修改App.js 和App.css 两个文件即可。

以下是代码

App.js 建议直接全选后复制粘贴：）


```javascript
import React , { Component } from 'react';
import Button from '@material-ui/core/Button'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PhoneAndroid from '@material-ui/icons/PhoneAndroid';
import Lock from '@material-ui/icons/Lock';
import logo from './logo.svg';

import './App.css';


class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      password: '',
      showPassword: false,
    }
  }

  handleChange = prop => event => {
    this.setState({
      [prop]: event.target.value,
    });
  }

  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  }

  render () {
    return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <FormControl style={{ marginTop: '5vh', width: '80vw'}} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-number">Account</InputLabel>
          <OutlinedInput
            id="outlined-adornment-number"
            type='text'
            startAdornment={
              <InputAdornment position="start">
                <PhoneAndroid />
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>

        <FormControl style={{ marginTop: '5vh', width: '80vw'}} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={this.handleChange('password')}
            startAdornment={
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                  edge="end"
                >
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>

        <Button 
          variant="contained" 
          style={{ marginTop: '4vh', width: '80vw'}} 
          color="primary" 
          onClick={()=>{
              console.log('start to signin')
          }}
        >
          Sign In
        </Button>
      </header>
    </div>
    )
  }
}

export default App;

```

App.css 只需要修改一行background-color颜色的代码


```css
.App-header {
  /*background-color: #282c34;*/
  background-color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}
```

然后去你Eectron的上看最终效果，大概是长这样的


![](https://user-gold-cdn.xitu.io/2020/2/6/170188544c02be6f?w=800&h=600&f=jpeg&s=294302)

## 小结

总的来说，我觉得用react + electron的方式做桌面的app还是蛮简单的，类似直接做web开发。当然，我也是刚入手，后续还会继续研究。