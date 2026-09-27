/**
 * jspsych-flex-map
 * Josh de Leeuw
 *
 * plugin for displaying a stimulus and getting a keyboard response
 *
 * documentation: docs.jspsych.org
 *
 **/


jsPsych.plugins["flex-map"] = (function () {

  var plugin = {};



  jsPsych.randomID = function(length) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var randomString = '';

    length = length || 8;

    var timestamp = new Date().getTime().toString(36);

    for (var i = 0; i < length; i++) {
      var randomIndex = Math.floor(Math.random() * chars.length);
      randomString += chars.substring(randomIndex, randomIndex + 1);
    }
    
    return timestamp + '_' + randomString;
  };

  var subject = jsPsych.data.getURLVariable('subject') || localStorage.getItem('subject') || jsPsych.randomID();
  var begin_time = new Date().toISOString();
  var user_ip = "unknown";
  
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      user_ip = data.ip;
    })
    .catch(error => {
      console.error('Failed to get IP address:', error);
    });
  
  localStorage.setItem('subject', subject);

  console.log("Subject: " + subject);
  console.log("Start Time: " + begin_time);
  console.log("User IP: " + user_ip);



  jsPsych.pluginAPI.registerPreload('flex-map', 'stimulus', 'image');

  plugin.info = {
    name: 'flex-map',
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

      // new
      correct_response: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: "Correct response",
        default: null,
        description: "Index of the correct response",
      },
      feedback: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: "Feedback",
        default: null,
        description: "Feedback to display after the response",
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
        description: 'If true, the image will be drawn onto a canvas element (prevents blank screen between consecutive images in some browsers).' +
          'If false, the image will be shown via an img element.'
      }
    }
  }

  var current_question = 1;

  plugin.trial = function (display_element, trial) {

    var height, width;


    // add prompt
    var html = '';
    html += '<div style="position: absolute; left: 10px; top: 10px; font-size: 16px; font-weight: bold;">' + current_question + '/18</div>';

    html += '<div style="position: absolute; width: 90%; left: 5%; top: 5%; text-align: left; font-size: 38px; font-weight: normal;">';
    if (trial.prompt) {
      html += trial.prompt;
    }
    html += "</div>";

    // display stimulus as an image element
    html += '<div style="margin-top: 0%; text-align: center;">';
    var boxSize = trial.stimulus_height * 1.5;
    html += '<img src="' + trial.item[0] + '" id="response_box1">';
    html += '<img style = " height:' + boxSize + 'px; width:90px; transform: translateY(-10%);" src="assets/img/single.png">';
    html += '<img  src="' + trial.item[1] + '" id="response_box2">';
    html += '<img style = "height: ' + boxSize + 'px; width:90px; transform: translateY(-10%);" src="assets/img/double.png">';
    html += '<img  src="' + trial.item[2] + '" id="response_box3">';
    html += '<img style = "height: ' + boxSize + 'px; width:90px; transform: translateY(-10%);" src="assets/img/single.png">';
    html += '<img  src="assets/img/response-box1.png" id="response_box4">';
    html += '</div>';

    html += '<br><br><br><br><br>'

    html += '<div style="display: flex; justify-content: center; width: 100%; margin: 0 auto;">';
    html += '<div style="text-align: center; width: 300px; margin: 0 40px;">';
    html += '<img src="' + trial.stimulus[0] + '" id="jspsych-flex-map-stimulus1" style="height:180px; width:180px; object-fit: fill; box-sizing: border-box; border: 8px solid transparent;">';
    html += '</div>';
    html += '<div style="text-align: center; width: 300px; margin: 0 40px;">';
    html += '<img src="' + trial.stimulus[1] + '" id="jspsych-flex-map-stimulus2" style="height:180px; width:180px; object-fit: fill; box-sizing: border-box; border: 8px solid transparent;">';
    html += '</div>';
    html += '<div style="text-align: center; width: 300px; margin: 0 40px;">';
    html += '<img src="' + trial.stimulus[2] + '" id="jspsych-flex-map-stimulus3" style="height:180px; width:180px; object-fit: fill; box-sizing: border-box; border: 8px solid transparent;">';
    html += '</div>';
    html += '<div style="text-align: center; width: 300px; margin: 0 40px;">';
    html += '<img src="' + trial.stimulus[3] + '" id="jspsych-flex-map-stimulus4" style="height:180px; width:180px; object-fit: fill; box-sizing: border-box; border: 8px solid transparent;">';
    html += '</div>';
    html += '</div>';

    
    
    // html += '<div style = "position: absolute; width: 10%; left: 45%; top: 80%;" class = "jspsych-btn" id = "submit-button">Submit your answer</div>'
    //html += '<button class = "btn" id = "submitbutton" style="position: fixed; bottom: 20px; right: 20px; display: none;">Submit your answer</button>'
    //html += '<button class = "btn" id = "nextbutton" style="position: fixed; bottom: 20px; right: 20px; display: none;">Continue</button>'
    html += '<button class = "btn" id = "submitbutton" style="position: absolute; width: 8%; left: 46%; top: 80%;">提交答案</button>'
    html += '<button class = "btn" id = "nextbutton" style="position: absolute; width: 8%; left: 46%; top: 80%; display: none;">继续</button>'
    //html += '<div id="feedback-container" style="height: 100px; margin-top: 50px; text-align: center; font-size: 28px;"></div>';
    html += '<div id="feedback-container" style="position: absolute; width: 80%; left: 10%; top: 87%; font-size: 28px; line-height: 1.5;"></div>';
    // html += '<br><br><button class = "btn" id = "submitbutton"> Submit</button>'
    // html += '<br><br><button class = "btn" id = "nextbutton"> Next</button>'
    // html += '<br><br><button class = "btn reset" id = "restbutton"> Reset</button>'
    // // add prompt
    // if (trial.prompt !== null){
    //   html += trial.prompt;
    // }

    //html += '<div><br><br> <p>Drag the shapes to their correct position</p></div>'
    // update the page content
    display_element.innerHTML = html;

    // set image dimensions after image has loaded (so that we have access to naturalHeight/naturalWidth)
    var img1 = display_element.querySelector('#jspsych-flex-map-stimulus1');
    var img2 = display_element.querySelector('#jspsych-flex-map-stimulus2');
    var img3 = display_element.querySelector('#jspsych-flex-map-stimulus3');
    var img4 = display_element.querySelector('#jspsych-flex-map-stimulus4');


    var img6 = display_element.querySelector('#response_box1');
    var img7 = display_element.querySelector('#response_box2');
    var img8 = display_element.querySelector('#response_box3');
    var img9 = display_element.querySelector('#response_box4');

    if (trial.stimulus_height !== null) {
      height = trial.stimulus_height;
      if (trial.stimulus_width == null && trial.maintain_aspect_ratio) {
        width = img1.naturalWidth * (trial.stimulus_height / img1.naturalHeight);
      }
    } else {
      height = img1.naturalHeight;
    }
    if (trial.stimulus_width !== null) {
      width = trial.stimulus_width;
      if (trial.stimulus_height == null && trial.maintain_aspect_ratio) {
        height = img1.naturalHeight * (trial.stimulus_width / img.naturalWidth);
      }
    } else if (!(trial.stimulus_height !== null & trial.maintain_aspect_ratio)) {
      // if stimulus width is null, only use the image's natural width if the width value wasn't set
      // in the if statement above, based on a specified height and maintain_aspect_ratio = true
      width = img1.naturalWidth;
    }

    // img1.style.height = height.toString() + "px";
    // img1.style.width = width.toString() + "px";
    // img2.style.height = height.toString() + "px";
    // img2.style.width = width.toString() + "px";
    // img3.style.height = height.toString() + "px";
    // img3.style.width = width.toString() + "px";
    // img4.style.height = height.toString() + "px";
    // img4.style.width = width.toString() + "px";


    // img6.style.height = trial.stimulus_height + "px";
    // img6.style.width = trial.stimulus_height + "px";
    // img7.style.height = trial.stimulus_height + "px";
    // img7.style.width = trial.stimulus_height + "px";
    // img8.style.height = trial.stimulus_height + "px";
    // img8.style.width = trial.stimulus_height + "px";
    // img9.style.height = "150px";
    // img9.style.width = "200px";
    img6.style.height = "180px";
    img6.style.width = "180px";
    img7.style.height = "180px";
    img7.style.width = "180px";
    img8.style.height = "180px";
    img8.style.width = "180px";
    img9.style.height = "180px";
    img9.style.width = "180px";



    // start time
    var start_time = performance.now();



    // draggable

    // $(function () {

    //   $("#submitbutton").hide();
    //   $("#nextbutton").hide();

    //   $('#response_box4').droppable({
    //     drop: handleDropEvent_4
    //   });
    //   $("#jspsych-flex-map-stimulus1").draggable({
    //     helper: 'original',
    //     revert: "invalid"
    //   });
    //   $("#jspsych-flex-map-stimulus2").draggable({
    //     helper: 'original',
    //     revert: "invalid"
    //   });
    //   $("#jspsych-flex-map-stimulus3").draggable({
    //     helper: 'original',
    //     revert: "invalid"
    //   });
    //   $("#jspsych-flex-map-stimulus4").draggable({
    //     helper: 'original',
    //     revert: "invalid"
    //   });
    //   $("#jspsych-flex-map-stimulus5").draggable({
    //     helper: 'original',
    //     revert: "invalid"
    //   });
    // });


    response1 = 0;
    response2 = 0;
    response3 = 0;
    response4 = 0;
    response5 = 0;



    function handleDropEvent_4(event, ui) {
      var draggable = ui.draggable;
      response4 = 1;
      //$('#response_box4').droppable("option", "disabled", true)
      $('#jspsych-flex-map-stimulus1').draggable("option", "disabled", true)
      $('#jspsych-flex-map-stimulus2').draggable("option", "disabled", true)
      $('#jspsych-flex-map-stimulus3').draggable("option", "disabled", true)
      $('#jspsych-flex-map-stimulus4').draggable("option", "disabled", true)
      $("#submitbutton").show()
      selection4 = draggable.attr('id')
      if (selection4 == "jspsych-flex-map-stimulus1") { selection4 = trial.stimulus[0] } else
        if (selection4 == "jspsych-flex-map-stimulus2") { selection4 = trial.stimulus[1] } else
          if (selection4 == "jspsych-flex-map-stimulus3") { selection4 = trial.stimulus[2] } else
            if (selection4 == "jspsych-flex-map-stimulus4") { selection4 = trial.stimulus[3] }

    }




    function handleDropEvent_RIGHT(event, ui) {
      var draggable = ui.draggable;
      //alert( 'The square with ID "' + draggable.attr('id') + '" was dropped onto me!' );
      if (draggable.attr('id') == "jspsych-bongard-key-stimulus1") { $("#stim1_indicator").text("R"); stim1_lock = 1; R1 = "R" }
      if (draggable.attr('id') == "jspsych-bongard-key-stimulus2") { $("#stim2_indicator").text("R"); stim2_lock = 1; R2 = "R" }
      if (draggable.attr('id') == "jspsych-bongard-key-stimulus3") { $("#stim3_indicator").text("R"); stim3_lock = 1; R3 = "R" }
      if (stim1_lock == 1 & stim2_lock == 1 & stim3_lock == 1) {
        $("#jspsych-bongard-drag-button-0").show();

      }
    }

    // Reset button

    $("#jspsych-flex-map-stimulus1").data({
      'originalLeft': $("#jspsych-flex-map-stimulus1").css('left'),
      'origionalTop': $("#jspsych-flex-map-stimulus1").css('top')
    });

    $("#jspsych-flex-map-stimulus2").data({
      'originalLeft': $("#jspsych-flex-map-stimulus2").css('left'),
      'origionalTop': $("#jspsych-flex-map-stimulus2").css('top')
    });

    $("#jspsych-flex-map-stimulus3").data({
      'originalLeft': $("#jspsych-flex-map-stimulus3").css('left'),
      'origionalTop': $("#jspsych-flex-map-stimulus3").css('top')
    });

    $("#jspsych-flex-map-stimulus4").data({
      'originalLeft': $("#jspsych-flex-map-stimulus4").css('left'),
      'origionalTop': $("#jspsych-flex-map-stimulus4").css('top')
    });



    // $(".reset").click(function () {
    //   $("#jspsych-flex-map-stimulus1").css({
    //     'left': $("#jspsych-flex-map-stimulus1").data('originalLeft'),
    //     'top': $("#jspsych-flex-map-stimulus1").data('origionalTop')
    //   });

    //   $("#jspsych-flex-map-stimulus2").css({
    //     'left': $("#jspsych-flex-map-stimulus2").data('originalLeft'),
    //     'top': $("#jspsych-flex-map-stimulus2").data('origionalTop')
    //   });

    //   $("#jspsych-flex-map-stimulus3").css({
    //     'left': $("#jspsych-flex-map-stimulus3").data('originalLeft'),
    //     'top': $("#jspsych-flex-map-stimulus3").data('origionalTop')
    //   });

    //   $("#jspsych-flex-map-stimulus4").css({
    //     'left': $("#jspsych-flex-map-stimulus4").data('originalLeft'),
    //     'top': $("#jspsych-flex-map-stimulus4").data('origionalTop')
    //   });



    //   $('#jspsych-flex-map-stimulus1').draggable("option", "disabled", false)
    //   $('#jspsych-flex-map-stimulus2').draggable("option", "disabled", false)
    //   $('#jspsych-flex-map-stimulus3').draggable("option", "disabled", false)
    //   $('#jspsych-flex-map-stimulus4').draggable("option", "disabled", false)



    //   $('#response_box4').droppable("option", "disabled", false)


    //   response1 = 0;
    //   response2 = 0;
    //   response3 = 0;
    //   response4 = 0;


    //   $("#submitbutton").hide();
    //   $("#nextbutton").hide();


    // });




    let selectedImageId = null;

    const selectedBorderColor = 'rgb(21, 96, 130)';


    function addClickEvents() {
      const imageIds = [
        'jspsych-flex-map-stimulus1',
        'jspsych-flex-map-stimulus2',
        'jspsych-flex-map-stimulus3',
        'jspsych-flex-map-stimulus4'
      ];

      imageIds.forEach(id => {
        const img = document.getElementById(id);
        img.addEventListener('click', function () {

          if (selectedImageId) {
            document.getElementById(selectedImageId).style.border = '';
          }

          this.style.border = `8px solid ${selectedBorderColor}`;
          selectedImageId = id;

          document.getElementById('submitbutton').style.display = 'block';
        });
      });
    }
    $("#submitbutton").hide();
    $("#nextbutton").hide();
    addClickEvents();

    // document.getElementById('submitbutton').addEventListener('click', function () {
    //   if (selectedImageId) {

    //     let selectedIndex = parseInt(selectedImageId.replace('jspsych-flex-map-stimulus', ''));
    //     let correct = (selectedIndex === trial.correct_response);


    //     jsPsych.finishTrial({
    //       stimulus: trial.stimulus,
    //       response: selectedIndex,
    //       correct: correct
    //     });
    //   }
    // });



    var submit_button_click_time = null;
    var selection = null;
    $("#submitbutton").click(function () {
      // selection = selection4;

      if (selectedImageId) {
        selection = parseInt(selectedImageId.replace('jspsych-flex-map-stimulus', ''));
      }
      submit_button_click_time = performance.now();

      disableImageSelection();

      if (trial.feedback) {
        // If feedback is enabled, do not end the trial yet
        // Change the submit button to a next button
        $("#submitbutton").hide();
        $("#restbutton").hide();
        $("#nextbutton").show();

        if (selectedImageId) {
          document.getElementById(selectedImageId).style.border = '8px solid transparent';
        }

        // Display the feedback message
        document.getElementById('feedback-container').innerHTML = trial.feedback_message;

        if (window.MathJax) {
          MathJax.typesetPromise && MathJax.typesetPromise();
        }

        // Highlight the correct image based on correct_response
        let correctImageId = `#jspsych-flex-map-stimulus${trial.correct_response}`;
        $(correctImageId).css("border", "8px solid green"); // Add a bold green border
      } else {
        // If feedback is disabled, end the trial immediately
        after_response();
      }

    });

    function disableImageSelection() {
      const newImg1 = img1.cloneNode(true);
      img1.parentNode.replaceChild(newImg1, img1);
      const newImg2 = img2.cloneNode(true);
      img2.parentNode.replaceChild(newImg2, img2);
      const newImg3 = img3.cloneNode(true);
      img3.parentNode.replaceChild(newImg3, img3);
      const newImg4 = img4.cloneNode(true);
      img4.parentNode.replaceChild(newImg4, img4);
    }

    $(document).off("click", "#nextbutton");
    $(document).on("click", "#nextbutton", function () {
      after_response(); // End the trial and move to the next question
    });

    // store response
    var response = {
      rt: null,
      key: null
    };

    // function to end trial when it is time
    var end_trial = function () {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }

      // measure rt
      var rt = submit_button_click_time - start_time;
      var fit = performance.now() - submit_button_click_time;

      let isCorrect = (selection === trial.correct_response) ? 1 : 0;

      // gather the data to store for the trial
      var trial_data = {
        subject: subject,
        IP: user_ip,
        start_time: begin_time,
        stimulus: current_question,
        response: selection,
        response_time: rt,
        inspection_time: fit,
        correct: isCorrect
      };
      console.log(trial_data);
      // clear the display
      display_element.innerHTML = '';

      current_question++;

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    // function to handle responses by the subject
    var after_response = function (info) {


      // after a valid response, the stimulus will have the CSS class 'responded'
      // which can be used to provide visual feedback that a response was recorded
      //display_element.querySelector('#jspsych-flex-map-stimulus').className += ' responded';

      // only record the first response
      if (info && response.key == null) {
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
      jsPsych.pluginAPI.setTimeout(function () {
        display_element.querySelector('#jspsych-flex-map-stimulus').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function () {
        end_trial();
      }, trial.trial_duration);
    } else if (trial.response_ends_trial === false) {
      console.warn("The experiment may be deadlocked. Try setting a trial duration or set response_ends_trial to true.");
    }
  };

  return plugin;
})();
