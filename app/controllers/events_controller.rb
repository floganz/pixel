class EventsController < ApplicationController
  include ActionDispatch
  respond_to :json
  def create
    @event = Event.new event_params
    if @event.save
      render :status => 200,
       :json => { :success => true,
                  :info => "created",
                  :event => @event
       } 
    else
      render :status => 200,
       :json => { :success => false,
                  :info => "create fail",
       }
    end
  end

  def update
    @event = Event.update params[:id], event_params
    if @event.save
      render :status => 200,
       :json => { :success => true,
                  :info => "updated",
                  :event => @event
       } 
    else
      render :status => 200,
       :json => { :success => false,
                  :info => "update fail",
       }
    end
  end

  def destroy
    @event = Event.find params[:id]
    if @event.destroy
      render :status => 200,
       :json => { :success => true,
                  :info => "deleted",
       } 
    else
      render :status => 200,
       :json => { :success => false,
                  :info => "delete fail",
       }
    end
  end

  def add
    # raise env['REMOTE_ADDR']
    # raise ActionDispatch::Request::remote_ip()
    # raise "here"
    @events = Event.is_unique? env['REMOTE_ADDR'], Date.today
    if @events.size == 0
      @event = Event.new
      if event_params[:unique_id].present?
        @event.target_id = event_params[:unique_id]
      else
        @event.target_id = event_params[:visit_id]
      end
      @event.ip = env['REMOTE_ADDR']
      @event.date = Date.today
      @event.save!
    else
      @event = Event.new
      @event.target_id = event_params[:visit_id]
      @event.ip = env['REMOTE_ADDR']
      @event.date = Date.today
      @event.save!
    end
    return 'pixel'
  end

  def event_params
    params.require(:event).permit(:unique_id, :visit_id)
  end
end
