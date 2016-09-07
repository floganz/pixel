class EventsController < ApplicationController
  include ActionDispatch
  respond_to :json

  def createEvent
    unique = Event.is_unique? env['REMOTE_ADDR'], Date.today, params[:id]
    @event = Event.new
    @event.target_id = params[:id]
    @event.ip = env['REMOTE_ADDR']
    @event.date = Date.today
    @event.browser = client_browser_name
    if unique
      @event.unique = true
    end
    @event.save!
    redirect_to ActionController::Base.helpers.asset_path 'pixel'
  end

  def client_browser_name
    user_agent = request.env['HTTP_USER_AGENT'].downcase
    if user_agent =~ /msie/i
      "Internet Explorer"
    elsif user_agent =~ /konqueror/i
      "Konqueror"
    elsif user_agent =~ /chrome/i
      "Chrome"
    elsif user_agent =~ /gecko/i
      "Mozilla"
    elsif user_agent =~ /opera/i
      "Opera"
    elsif user_agent =~ /applewebkit/i
      "Safari"
    else
      "Unknown"
    end
  end

  private
    def event_params
      params.require(:event).permit(:id)
    end
end
