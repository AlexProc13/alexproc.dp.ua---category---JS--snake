<?php
$results = file('results.txt');
$massages=array();
foreach($results as $result)
{
    $arr = explode(':', $result);
    $err1['name']=$arr[0];
    $massages[]=$err1;
}
echo json_encode($massages);