$(function(){
	$('#reg-btn').click(function(){
		register('register');
	});
	$('#log-btn').click(function(){
		login('login');
	});
})

function register(id){
	//通过serialize()方法序列化表单值，例如："username=张三&password=12345"
	var data=$('#'+id+' form').serialize();
	$.ajax({
		url:'/'+id,
		type:'POST',
		data:data,
		success:function(data,status){
			if(status == 'success'){
				location.href = '/login';
			}
		},
		error:function(res,err){
			location.href = '/register';
		}
	})
}

function login(id){
	//通过serialize()方法序列化表单值，例如："username=张三&password=12345"
	var data=$('#'+id+' form').serialize();
	$.ajax({
		url:'/'+id,
		type:'POST',
		data:data,
		success:function(data,status){
			if(status == 'success'){
				location.href = '/';
			}
		},
		error:function(res,err){
			location.href = '/login';
		}
	})
}
