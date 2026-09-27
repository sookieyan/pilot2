/**
 * jspsych-conf-rate
 * Josh de Leeuw
 *
 * plugin for displaying a stimulus and getting a keyboard response
 *
 * documentation: docs.jspsych.org
 *
 **/


jsPsych.plugins["conf-rate"] = (function() {

  var plugin = {};

  jsPsych.pluginAPI.registerPreload('conf-rate', 'stimulus', 'image');

  plugin.info = {
    name: 'conf-rate',
    description: '',
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.IMAGE,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The image to be displayed'
      },
      stimulus_height: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Image height',
        default: null,
        description: 'Set the image height in pixels'
      },
      stimulus_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Image width',
        default: null,
        description: 'Set the image width in pixels'
      },
      maintain_aspect_ratio: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Maintain aspect ratio',
        default: true,
        description: 'Maintain the aspect ratio after setting width or height'
      },
      choices: {
        type: jsPsych.plugins.parameterType.KEY,
        array: true,
        pretty_name: 'Choices',
        default: jsPsych.ALL_KEYS,
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the stimulus.'
      },
      stimulus_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus duration',
        default: null,
        description: 'How long to hide the stimulus.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show trial before it ends.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when subject makes a response.'
      },
      render_on_canvas: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Render on canvas',
        default: true,
        description: 'If true, the image will be drawn onto a canvas element (prevents blank screen between consecutive images in some browsers).'+
          'If false, the image will be shown via an img element.'
      }
    }
  }

  plugin.trial = function(display_element, trial) {

    var height, width;


var half_thumb_width = 7.5;
      // display stimulus as an image element

      var html = '<img  src="'+trial.item[0]+'" id="response_box1">';
      html +=  '<img style = " height:' + trial.stimulus_height +'px; width:60px" src="assets/img/single.png">';
      html +=  '<img  src="'+trial.item[1]+'" id="response_box2">';
      html +=  '<img style = "height: ' + trial.stimulus_height +'px; width:60px" src="assets/img/double.png">';
      html +=  '<img  src="'+trial.item[2]+'" id="response_box3">';
      html +=  '<img style = "height: ' + trial.stimulus_height +'px; width:60px" src="assets/img/single.png">';
      html +=  '<img  src="assets/img/response-box.png" id="response_box4">';
      html += '<br><br><br><br><br>'

      // half of the thumb width value from jspsych.css, used to adjust the label positions
var half_thumb_width = 7.5;

html += '<div id="jspsych-html-slider-response-wrapper" style="margin: 100px 0px;">';
html += '<div id="jspsych-html-slider-response-stimulus">' + trial.prompt + '</div>';
html += '<div class="jspsych-html-slider-response-container" style="position:relative; margin: 0 auto 3em auto; ';
if(trial.slider_width !== null){
  html += 'width:'+trial.slider_width+'px;';
} else {
  html += 'width:auto;';
}
html += '">';
html += '<input type="range" class="jspsych-slider" value="'+trial.slider_start+'" min="'+trial.min+'" max="'+trial.max+'" step="'+trial.step+'" id="jspsych-html-slider-response-response"></input>';
html += '<div>'
for(var j=0; j < trial.labels.length; j++){
  var label_width_perc = 100/(trial.labels.length-1);
  var percent_of_range = j * (100/(trial.labels.length - 1));
  var percent_dist_from_center = ((percent_of_range-50)/50)*100;
  var offset = (percent_dist_from_center * half_thumb_width)/100;
  html += '<div style="border: 1px solid transparent; display: inline-block; position: absolute; '+
  'left:calc('+percent_of_range+'% - ('+label_width_perc+'% / 2) - '+offset+'px); text-align: center; width: '+label_width_perc+'%;">';
  html += '<span style="text-align: center; font-size: 80%;">'+trial.labels[j]+'</span>';
  html += '</div>'
}
html += '</div>';
html += '</div>';
html += '</div>';








       html += '<br><br><button disabled class = "btn reset"> Continue</button>'


      //html += '<div><br><br> <p>Drag the shapes to their correct position</p></div>'
      // update the page content
      display_element.innerHTML = html;

      // set image dimensions after image has loaded (so that we have access to naturalHeight/naturalWidth)


      var img6 = display_element.querySelector('#response_box1');
      var img7 = display_element.querySelector('#response_box2');
      var img8 = display_element.querySelector('#response_box3');
      var img9 = display_element.querySelector('#response_box4');




      img6.style.height = trial.stimulus_height + "px";
      img6.style.width = trial.stimulus_height + "px";
      img7.style.height = trial.stimulus_height + "px";
      img7.style.width = trial.stimulus_height + "px";
      img8.style.height = trial.stimulus_height + "px";
      img8.style.width = trial.stimulus_height + "px";
      img9.style.height = "150px";
      img9.style.width = "200px";



      // start time
         var start_time = performance.now();



// draggable

document.getElementById("jspsych-html-slider-response-response").oninput = function() {
const button = document.querySelector('button')
button.disabled = false;

};




$(".reset").click(function() {
  selections = document.getElementById("jspsych-html-slider-response-response").value;
after_response();
})

    // store response
    var response = {
      rt: null,
      key: null
    };

    // function to end trial when it is time
    var end_trial = function() {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }

      // measure rt
      var end_time = performance.now();
      var rt = end_time - start_time;


      // gather the data to store for the trial
      var trial_data = {
        rt: rt,
        stimulus: trial.stimulus,
        response: selections
      };

      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    // function to handle responses by the subject
    var after_response = function(info) {


      // after a valid response, the stimulus will have the CSS class 'responded'
      // which can be used to provide visual feedback that a response was recorded
      //display_element.querySelector('#jspsych-conf-rate-stimulus').className += ' responded';

      // only record the first response
      if (response.key == null) {
        response = info;
      }

      if (trial.response_ends_trial) {
        end_trial();
      }
    };

    // start the response listener
    if (trial.choices != jsPsych.NO_KEYS) {
      var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.choices,
        rt_method: 'performance',
        persist: false,
        allow_held_key: false
      });
    }

    // hide stimulus if stimulus_duration is set
    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-conf-rate-stimulus').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    } else if (trial.response_ends_trial === false) {
      console.warn("The experiment may be deadlocked. Try setting a trial duration or set response_ends_trial to true.");
    }
  };

  return plugin;
})();
