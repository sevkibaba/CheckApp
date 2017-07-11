<?php

namespace App\Controllers\Report;

use App\Controllers\Controller;
use App\Models\User;
use App\Models\Product;
use App\Models\Check;
use App\Models\Order;

use App\Controllers\Auth;
use Respect\Validation\Validator as v;

class ReportController extends Controller {

	public function getReport($request, $response){

		return $this->view->render($response, 'reports/chartjs.twig');
	}

	public function todaysChecks($request, $response, $args){
		
		$todaysChecks = Order :: where('user_id', $_SESSION['user'])
		->whereDate('created_at', '=', date($args['date']))
		->get()->toArray();
		
		return json_encode($todaysChecks);
	}
	public function monthsChecks($request, $response, $args){
		
		$d = cal_days_in_month(CAL_GREGORIAN,10,2005);

		$monthsChecks = Check :: where('user_id', $_SESSION['user'])
		->whereDate('created_at', '<=', date($args['date']."-".$d))
		->whereDate('created_at', '>=', date($args['date']."-1"))
		->get()->toArray();
		
		return json_encode($monthsChecks);
	}
}
	