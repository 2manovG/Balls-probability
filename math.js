//get value of ksi
function getKsi(m, r, l)
{
	let p = r / (r + m); //probability of black ball
	
	let ksi = 0; //value of ksi
	for (let i = 0; i < l; i++)
	{
		if (Math.random() < p) ksi++;
	}
	return ksi;
}

//carry out n experiments
function experiment(m, r, l, n) //generate array [v1, v2, ..., vn]
{
	let successes = 0; //ammount of successfull experiments
	let v = []; //array of frequences
	
	for (let i = 1; i <= n; i++)
	{
		//we need to add to successes variable 1 if A and 0 if not A
		//A means ksi is odd
		//so we just add (ksi mod 2) to successes each time
		successes += getKsi(m, r, l) % 2;
		v.push(successes / i);
	}
	return v;
}

//now we need to find propper value of probability
//find C(k, n)
function C(k, n)
{
	let c = 1;
	for (let i = 1; i <= k; i++) c *= (n - k + i) / i;
	return c;
}
//find P(ksi = k)
function Pk(m, r, l, k)
{
	if (k > l) return 0;
	return C(k, l) * Math.pow(r, k) * Math.pow(m, l - k) / Math.pow(m + r, l);
}
//find P(A)
function probability(m, r, l)
{
	let kmax = Math.floor((l - 1) / 2); //upper limit of summing
	
	let p = 0; //probability
	for (let k = 0; k <= kmax; k++) p += Pk(m, r, l, 2 * k + 1);
	return p;
}

//find n, from which...
function checkN(n, N, v, p, eps)
{
	for (let i = n; i < n + N; i++)
		if (Math.abs(v[i] - p) > eps) return false;
	return true;
}
function findN(N, v, p, eps)
{
	for (let i = 0; i < v.length - N; i++)
		if (checkN(i, N, v, p, eps)) return i;
	return undefined;
}