<?php
$results = file('results.txt');
$massages=array();
foreach($results as $result)
{
	$arr = explode(':', $result);
	$err1['name']=$arr[0];
	$err1['score']=$arr[1];
    $massages[]=$err1;
    //echo $err1;
	//echo '<p>' . $arr[0] . ' ________ ' . $arr[1] . 'очков</p>';
}
echo json_encode($massages);
