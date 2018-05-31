import sys
from QtGui import QtGui,QtCore
class Check(QtGui.QMainWindow):
  def __init__(self):
    super(Window,self).__init__()
    w=QMainWindow()
    w.setWindowTitle('Simple Window')
    w.show()
 app=QApplication(sys.argv)
 GUI=Check()
 sys.exit(app.exec_())
