<?php

namespace App\Middleware;

class OldInputMiddleware extends Middleware {

	public function __invoke ($request, $response, $next){

		if (!isset($_SESSION['old'])){

			$_SESSION['old'] = array();

			$this->container->view->getEnvironment()->addGlobal('old', $_SESSION['old']);
		
		}else{
			$this->container->view->getEnvironment()->addGlobal('old', $_SESSION['old']);
			$_SESSION['old']= $request->getParams();
		}

		$response = $next($request, $response);

		// var_dump( $_SESSION['old']);
		// die();
		return $response;
	}

}