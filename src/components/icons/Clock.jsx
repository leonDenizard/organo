

function Clock(props) {
  return (
    <svg
      width={16}
      height={15}
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <path fill="url(#pattern0_30_213)" d="M0 0H15.3584V15H0z" />
      <defs>
        <pattern
          id="pattern0_30_213"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <use
            xlinkHref="#image0_30_213"
            transform="matrix(.00977 0 0 .01 .012 0)"
          />
        </pattern>
        <image
          id="image0_30_213"
          width={100}
          height={100}
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFwklEQVR4nO2dXYhVVRTHd9aMYRM5vaWOmlm9WGMYOULmV0ZQT04fVg/Rax9OUSFYiaTJgEFNQQZp5vTlQy/1kA8GPYymRdAXFQXXMgIhc8pqxrmjzi82LuhyOGNn33s+9l7n/EAYnLl39jr/O3vttfbaaxtTUVFRUVGhFOBCoBu4C3gaeBs4CHwN1IBhoC7/huX/7Pc+Ad6S19wp7zG1aHuCA7gAWASsB/YBJ0mPU8DnQD9wcyXQ5CJMAVYBu4G/yI8TwC5ghR2DKTtAF7AV+IXiOQI8B8wyZQO4HBhIeTpKi3FgELjKlEQI65RP4z+ngDeBOUYbQBvQB/xNeIwCm9QsAGQ18wPh8z2w0gS+fLWfrDPoYUJ8X7sJcPV0AL18Zv2hCQHgVomYtfM7sNr4DHCfLBvLQh24x/gI8Igyf+HiV54wPgE8m3j4etlkfAB4qOgn4RGPFS3GvSWdps41fd1f5GqqTA7cxdGvLiLOsMu+iniGc8uBSV7qEOXhfWCmTcsDex1et99mK/IQ5HnKw177AYzMDC7055EotI6rDBwApkXsn+34HvZZLc9KjKlKsrZJsEUSnTHbzO/hzneZJCOBZygHNeCyGPtfaOE916ctxhzgH/TzG3B1BpmIEWBumoK8g37+sLVbMbavS+n9d6clxhWyv6yZUWDpJNnrtDIRto5gfhqC7EA348BtMXbfnkEm4tVWxeiSVIBWJoAHYuzuychnWoFntyKILWLTzLoYm7vFn2TFlmbFmOJJRWFu+xfiL4+SLT83VbYqUblWXomxdwZwOKff7x69S+GzRt6NfkKBS4AvchzDTlcx2nOuQs8zWdgesXWanCUh56r7NhdBlqKPQ0BHzFbChwWNZ4mLIBvRxTfApTGLFjt9FcVTLoJ8jK5k4YwYG18seFwfuZzpG0MHR+PSFZ6ULZ1MVFEvgZEGTgDXeV62tCCJIPa0q4Zk4U0ZJwvToLcMDv00sCanZGH2jl3OdofAmJzVWAxcZJe0dilpMwyTLOPtX41vDCYRJIRzHb/GbSZNYk/WycJWGEpigN3g9/0vozuhGPNzSBa2wldJjPgJvxlIIobYYqc0nzmcxAjfS0RvUJQCOpbECN93CDscBOnEb8bKJsjFKBBE05S1BAVTlu9O/SUHQbajwKmHsOxdmMCO6z2MzJta9tpzDSEEhgv/x47FAVTqD2lKndSBl6WGqiPO2QN78JtB7VXuayK2zPV8b2eD9vR7LbrpA2zDX3rLsEHVF7FnusdL+QVJt3B9bL2XFPvwp0dsss3TfGM0cVM0BUUO22LKfX7EL/YlEkPJrmHd1ulGbOolNIfeMPgbCZ89MXYN4Q89LoK0KSglnbDBYcSuHk+CxT+dmwoAbxA+B4HzPAwWdziJIQO3rb810BvTO7joYHFZmQ/s1GKCxSLbgzR3YEfZkba+iF2uPUvSZHNTYsjAZwWwg5g0WOxsoWdJWtipcmbTgsjgX0MHHwDzxIcUdSZke0tiiCDzStA4IA/GU2u+HNAeic/sSkWMhjm3DM1nsmIk9ZZ/tlI7s+Hq58lUxWg4mWubcVW48a3TiVtHUVZ6kgsKhTNNReWOovi8JeobWzMVo+GilhBKhXxIbGYzVcWIUjVSPjfHc79MDLglgMrAIrCpplW5itEgylrPTrUWjX0WdxciRoMoDxb9FDziUeMDchtb2dlofAJ4uKTT1wTwuPERueBlvGQOfK3xGVl9+Vq6mSbHCltNNRmnaA4eP021dXgeKL96tc2ECrBCLvbVkLVdZjQQ+PXdI6qu74659mIwkD36cane7DLakaNmA56eQ6nLh+ZKUzak7msLcKRoFThbUbi55bopDUjZ6nLgdemVmGcV+k7rrKNF2RX/iXM+sMje22RPGaXcCW5U4qN+6W2f/mVd2uFsccW1wB1S+TIoD/VLKaQ+LvN+Xb6uyff2y89ukNdeUwlQUVFRUWEU8y/8tXqc5fcGCQAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  )
}

export default Clock
