<?php
$con=mysqli_connect('localhost','root');
mysqli_select_db($con,'aman');
$q="insert into student values(4,'Rajeev',6.4)";
echo $q;
 mysqli_query($con,$q);
mysqli_close($con);
?>
<html>
 <head>
  <h1>Database Connection using Mysql and PHP</h1>
  </head>
 </html>
