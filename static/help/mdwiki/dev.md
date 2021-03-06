#asoc开发简介

##1.环境准备
1. 下载python2.7安装并设置环境变量PYTHON_HOME指向根目录
1. 下载[ez_setup.py](http://peak.telecommunity.com/dist/ez_setup.py)并执行以安装setup tools
    ```python
    python ez_setup.py
    ```      
1. 将{PYTHON_HOME}/Script 加入环境变量中
1. 下载[distribute_setup.py](http://python-distribute.org/distribute_setup.py)并安装
```python
python distribute_setup.py
```
1. 安装pip
```python
easy_install pip
```

##2.开发环境
涉及系统以及源代码下载

[asocpy](http://sources.alipay.net/svn/asoc/trunk/asocpy)
: 数据展示以及管理系统

[asocprod](http://sources.alipay.net/svn/asoc/trunk/asocprod)
: 与其他系统的交互,包括与adc的数据交互等

###2.1 asocpy
- windows环境

安装depends目录下的所有exe文件,并且在该目录下执行以下语句来安装所有的依赖包
  
```bash
pip install -r requirements
```
  
完成后执行site目录下的siteapp.py本地启动应用,访问地址为[127.0.0.1:5000](127.0.0.1:5000)
###2.2 asocprod

**_(除非需要对adc上的数据进行特殊处理，如果只是将分析数据进行存储，那么不需要进行asocprod的开发，使用asoc.alipay.net上通用管理中-事件接收器配置即可)_**

- windows环境
  1. 首先确保安装了JDK6,以及maven工具,maven使用公司的[源](http://doc.alipay.net/pages/viewpage.action?pageId=39912187)
  1. 系统基于sofa3,运行环境为cloudengine,下载[cloudengine](http://sources.alipay.net/svn/tools/trunk/arch/cloudengine/),开发时使用的版本是3.2.0.1,`mvn eclipse:eclipse`后,导入eclipse,
  sofa-test-config.properties里面修改**asocprod_data**变量适应本地环境后,asocprod_data为tfs下载回来后文件所在文件夹
    ```xml
    asocprod_data=/Users/Carlos/alipay/dev/data
    ```
    运行时在run configure中的environment中添加**CLOUDENGINE_HOME**指向下载解压后的cloudengine目录,就可以在test car下执行start在本地运行调试了
- linux环境
    1. 联系徐庶或者独归部署

##3.adc数据分析开发
###3.1 架构简介
目前整体结构图如下:

![asoc_arch](../img/soc_dev_help/soc_arch.png)

**_注意:如果只是简单的数据展示,查看3.3报表制作,不需要进行开发工作_**

与adc的数据交互方式是

1. 在adc上根据业务进行安全分析,并将分析定时任务,在导出方式时选择导出到asoc
2. adc的定时任务运行后,将分析的结果存在tfs上,然后发送一条消息到消息中心msgBroker
3. asocprod订阅了该消息,根据收到的消息,将tfs上的分析结果取回本地,解析文件,并将解析结果存入数据库中
4. 在asocpy中根据数据库中的数据进行展示以及管理

###3.2 adc安全分析开发

####3.2.1 adc分析
在[ADC](http://adc.alipay.com)上进行分析,将分析加为定时任务
**注意点**:

    1. adc中定时任务0:00~9:00不能运行,定在9点以后
    2. 定时任务增加任务标签的时候使用英文,文件名中不要包含'_',该标签为最后传到tfs上的文件名的前半部分,例如:定时任务名称即代码标签为:sensMonitor,最后adc生成的文件名为:sensMonitor_20131223091515333_0.csv
    3. 导出选择'导出到asoc'
    4. 语句中必须包含select,select出的数据即为分析结果数据
####3.2.2 asocprod开发

    注意：除非需要对adc上的数据进行特殊处理，如果只是将分析数据进行存储，那么不需要进行asocprod的开发，使用事件接收器配置即可。具体操作在asoc.alipay.net上 通用管理-事件接受管理-新增 中按照步骤提示添加。

![asocprod](../img/soc_dev_help/asocprod.png)

项目结构adc处理car结构如上图:

1. manager和manager.impl为管理接口和实现,对于文件中的每行数据进行处理,一般为插入数据库中
2. parser解析类实现parse接口,对文件进行解析
3. biz-adc.xml中配置下对应关系,key就是之前adc中定时任务的任务标签,value为之前实现的解析类
    ```xml
    <bean id="scanByTimedTask" class="com.alipay.asocprod.biz.adc.scan.ScanByTimedTask">
        <constructor-arg index="0" value="${asocprod_data}" /> 
        <property name="fileParser">
            <!-- 解析对应类，文件名对应解析类 -->
            <map>
                <entry key="sensMonitor" value-ref="sens_monitor_parser" />
            </map>
        </property>
        <property name="executor" ref="taskExecutor" />
    </bean>
    ```

其他部分和sofa项目一致,dal中生成数据库操作.数据表名模拟现在已存在的数据库表名格式,清晰表明对应的业务

**_目前tfs中文件大小限制为100M以内以及文件中的总条数为100W条_**

####3.2.3 asocpy开发
![asocprod](../img/soc_dev_help/asocpy.jpeg)

采用[flask](http://docs.torriacg.org/docs/flask/)开发框架,建议先看下其中的快速入门有个大概的了解.

1. app目录下就是各模块，目前共有7个模块
    - avs是扫描平台
    - common是通用管理
    - home是大盘展示
    - info是会员信息安全
    - user是用户管理
    - vuls是漏洞与事件管理
    - dbaudit是数据库审计模块
2. config是一些配置文件，包括db链接以及ldap配置等
3. static是静态文件，css，js等
4. templates是页面文件，所有页面都在该目录下，与各模块一一对应
5. utils是一些工具类
6. siteapp是应用总文件，启动入口

下面介绍下主要操作
1、  添加模块
在app目录中新建子目录，例如aop，开放平台相关
```
App
----app
--------__init__.py
--------avsview.py
```
在avsview.py中增加`avsview = Blueprint('avs', __name__)`，生成该blueprint
并且在siteapp中，注册该blueprint

```python
from app.avs.avsview import avsview
app.register_blueprint(avsview, url_prefix='/avs'
```

注册完成后，参考之前的flask介绍的方案编写请求处理以及相关页面。
数据库操作相关，参考现有模块的models.py文件

####3.2.4 测试与部署
COMING SOON

####3.2.5 常见问题

COMING SOON

##4 adc数据报表开发
如果只是简单的需要进行数据展示,则不需要进行开发工作,只需要在adc中的发布平台上进行报表制作,最后将报表iframe的形式嵌入asoc中即可,具体过程如下:

###4.1 adc安全分析

###4.2 发布平台报表制作

###4.3 iframe嵌入asoc

###4.4 常见问题

##5 storm实时数据开发
