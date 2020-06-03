
//to define a 2D matrix
		function matrix2(m,n)
		{
			var matrix=new Array(m);
			for(var i=0;i<m;i++)
			{
				matrix[i]=new Array(n);
				
			}
			return matrix;
			
			
		}
		function zeros2(m,n)
		{
			var x=matrix2(m,n);
			for(var i=0;i<m;i++)
			{
				for(var j=0;j<n;j++)
				{
					x[i][j]=0;
				}
			}
			
			return x;
			
		}
		function space2(m,n)
		{
			var x=matrix2(m,n);
			for(var i=0;i<m;i++)
			{
				for(var j=0;j<n;j++)
				{
					x[i][j]='';
				}
			}
		}
